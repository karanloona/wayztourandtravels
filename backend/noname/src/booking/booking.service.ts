import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingDao } from './booking.dao';
import { CreateBookingDTO, CreateBookingInquiryDTO } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingDao: BookingDao,
  ) {}

  async createBooking(dto: CreateBookingDTO) {
    return this.bookingDao.createBooking(dto);
  }

  async getRecentBookings() {
    return this.bookingDao.getRecentBookings();
  }

  async updateBookingStatus(id: number, bookingStatus: number) {
    return this.bookingDao.updateBookingStatus(id, bookingStatus);
  }

  async updatePaymentStatus(uuid: string, paymentStatus: number, paymentId?: string) {
    return this.bookingDao.updatePaymentStatus(uuid, paymentStatus, paymentId);
  }

  async getBookingByUuid(uuid: string) {
    const booking = await this.bookingDao.getBookingByUuid(uuid);
    if (!booking) {
      throw new NotFoundException(`Booking with UUID ${uuid} not found`);
    }
    return booking;
  }

  async createBookingInquiry(dto: CreateBookingInquiryDTO) {
    return this.bookingDao.createBookingInquiry(dto);
  }

  async getAllInquiries() {
    return this.bookingDao.getAllInquiries();
  }

 
}