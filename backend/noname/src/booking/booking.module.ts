import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingDao } from './booking.dao';
import { Booking } from './booking.entity';
import { BookingInquiry } from './bookingInquiry.entity';
import { MailModule } from './Mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingInquiry]), MailModule],
  controllers: [BookingController],
  providers: [BookingService, BookingDao],
})
export class BookingModule {}