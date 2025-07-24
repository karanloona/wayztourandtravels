import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('booking_inquiries')
export class BookingInquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}