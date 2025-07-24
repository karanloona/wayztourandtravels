import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  contact: number;

  @Column()
  numberOfTravelers: number;

  @Column({default: 0, nullable: true})
  infants: number; 

  @Column()
  date: string;

  @Column({ default: 0 }) // 0: Pending, 1: Completed, 2: Failed
  paymentStatus: number;

  @Column({ nullable: true }) // Allow null initially, will be set after payment intent creation
  paymentId: string;

  @Column({ default: 0 }) // 0: Pending, 1: Confirmed, 2: Cancelled
  bookingStatus: number;

  @Column()
  tripProtection: boolean;

  @Column()
  totalCost: number;
}