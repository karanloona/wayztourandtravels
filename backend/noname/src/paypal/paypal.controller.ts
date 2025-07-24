import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH_NAME, JwtAuthGaurd } from 'src/gaurds/jwt-auth.gaurd';

@Controller('paypal')
@ApiTags('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  async createOrder(
    @Body() body: { amount: string; currency: string; description: string },
    @Headers('authorization') auth: string,
  ) {
    if (auth !== 'Bearer ThisIsTheComplexCode@123#123') {
      throw new Error('Unauthorized');
    }
    return this.paypalService.createOrder(body.amount, body.currency, body.description);
  }

  @Post('capture-order')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth(API_BEARER_AUTH_NAME)
  async captureOrder(@Body() body: { orderID: string }, @Headers('authorization') auth: string) {
    if (auth !== 'Bearer ThisIsTheComplexCode@123#123') {
      throw new Error('Unauthorized');
    }
    return this.paypalService.captureOrder(body.orderID);
  }
}