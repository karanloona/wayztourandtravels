import { Controller, Post, Body, UseGuards, Get, Patch, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDTO, CreateBookingInquiryDTO, RefundUuid } from './booking.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH_NAME, JwtAuthGaurd } from 'src/gaurds/jwt-auth.gaurd';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { MailService } from './mail.service';
import * as dotenv from 'dotenv';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  timeout: 1000
});

@Controller('booking')
@ApiTags('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  async createBooking(@Body() dto: CreateBookingDTO) {
    return this.bookingService.createBooking(dto);
  }

  @Get('recent')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  async getRecentBookings() {
    return this.bookingService.getRecentBookings();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  async updateBookingStatus(@Param('id') id: string, @Body() updateData: { bookingStatus: number }) {
    const updatedBooking = await this.bookingService.updateBookingStatus(Number(id), updateData.bookingStatus);
    await this.mailService.sendConfirmationEmail(updatedBooking);
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Get booking details by UUID' })
  @ApiResponse({ status: 200, description: 'Booking found successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingByUuid(@Param('uuid') uuid: string) {
    return this.bookingService.getBookingByUuid(uuid);
  }

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Create a payment intent for booking' })
  @ApiResponse({ status: 200, description: 'Payment intent created successfully' })
  async createPaymentIntent(@Body() body: { amount: number; currency: string; uuid: string }) {
    const { amount, currency, uuid } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: { bookingUuid: uuid },
    });

    // Update the booking with the paymentId
    await this.bookingService.updatePaymentStatus(uuid, 0, paymentIntent.id); // 0 = Pending

    return { clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id };
  }

  @Post('update-payment-status')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Update payment status after payment' })
  async updatePaymentStatus(@Body() body: { uuid: string; paymentStatus: number }) {
    const { uuid, paymentStatus } = body;
    const updatedBooking =  await this.bookingService.updatePaymentStatus(uuid, paymentStatus);
    await this.mailService.sendPaymentEmail(updatedBooking);
    return updatedBooking;
  }

  @Post('inquiry')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Submit an inquiry from modal form' })
  async createBookingInquiry(@Body() dto: CreateBookingInquiryDTO) {
    return this.bookingService.createBookingInquiry(dto);
  }

  @Get('all/inquiry')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Get all booking inquiries' })
  async getAllInquiries() {
    return this.bookingService.getAllInquiries();
  }

  @Post('refund/check-or-initiate')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  @ApiOperation({ summary: 'Initiate or check refund status for a booking' })
  @ApiResponse({ status: 200, description: 'Refund processed or status checked successfully' })
  async handleRefund(@Body() body: RefundUuid) {
    const { uuid } = body;

    const booking = await this.bookingService.getBookingByUuid(uuid);
    
    if (!booking || !booking.paymentId) {
      throw new NotFoundException('Booking or payment not found');
    }

    // Check if booking has trip protection - only allow refunds for bookings with trip protection
    if (!booking.tripProtection) {
      throw new NotFoundException('Refunds are only available for bookings with trip protection');
    }

    // Case 1: Refund not initiated yet
    if (booking.paymentStatus === 0 || booking.paymentStatus === 1) {
      // Calculate refund amount: subtract trip protection cost ($18) from total
      const tripProtectionCost = 18; // $18 trip protection cost
      const refundAmount = Math.max(0, (booking.totalCost - tripProtectionCost) * 100); // Convert to cents
      
      const refund = await stripe.refunds.create({
        payment_intent: booking.paymentId,
        amount: refundAmount, // Refund amount minus trip protection
      });

      // Update paymentStatus to "2" = refund initiated
      await this.bookingService.updatePaymentStatus(uuid, 2); // 2 = refund initiated

      return {
        message: 'Refund initiated',
        paymentStatus: 2,
        refund,
        refundAmount: refundAmount / 100, // Return in dollars
      };
    }

    // Case 2: Refund was already initiated, check status from Stripe
    const refunds = await stripe.refunds.list({
      payment_intent: booking.paymentId,
      limit: 1, // usually one refund per intent
    });

    const existingRefund = refunds.data[0];
    if (!existingRefund) {
      throw new NotFoundException('No refund found for this payment');
    }

    // Update payment status based on Stripe refund status
    let updatedStatus = booking.paymentStatus;
    if (existingRefund.status === 'succeeded') {
      updatedStatus = 3; // Refund completed
    } else if (existingRefund.status === 'pending') {
      updatedStatus = 2; // Refund in progress
    }

    if (updatedStatus !== booking.paymentStatus) {
      await this.bookingService.updatePaymentStatus(uuid, updatedStatus);
    }

    await this.mailService.sendRefundInitiatedEmail(booking);

    return {
      message: 'Refund status checked',
      paymentStatus: updatedStatus,
      refundStatus: existingRefund.status,
      refund: existingRefund,
    };
  }

}