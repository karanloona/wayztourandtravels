import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';


@Module({
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}