import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDTO, CreateBookingInquiryDTO } from './booking.dto';
import { BookingInquiry } from './bookingInquiry.entity';

@Injectable()
export class BookingDao {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(BookingInquiry)
    private bookingInquiryRepository: Repository<BookingInquiry>,
  ) {}

  async createBooking(dto: CreateBookingDTO) {
    const booking = this.bookingRepository.create(dto);
    return await this.bookingRepository.save(booking);
  }

  async getRecentBookings() {
    return await this.bookingRepository.find({
      order: { id: 'DESC' },
    });
  }

  async updateBookingStatus(id: number, bookingStatus: number) {
    await this.bookingRepository.update(id, { bookingStatus });
    return this.bookingRepository.findOne({ where: { id } });
  }

  async updatePaymentStatus(uuid: string, paymentStatus: number, paymentId?: string) {
    const updateData: Partial<Booking> = { paymentStatus };
    if (paymentId) updateData.paymentId = paymentId;
    await this.bookingRepository.update({ uuid }, updateData);
    return this.bookingRepository.findOne({ where: { uuid } });
  }

  async getBookingByUuid(uuid: string) {
    return await this.bookingRepository.findOne({ where: { uuid } });
  }

  async createBookingInquiry(dto: CreateBookingInquiryDTO) {
    const inquiry = this.bookingInquiryRepository.create(dto);
    return this.bookingInquiryRepository.save(inquiry);
  }

  async getAllInquiries() {
    return this.bookingInquiryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

 
  
}