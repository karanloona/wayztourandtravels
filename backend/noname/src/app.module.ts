import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { FilesModule } from './files/files.module';
import { TestModule } from './test/test.module';
import { BookingModule } from './booking/booking.module';
import { PaypalModule } from './paypal/paypal.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TestModule,
    BookingModule,
    PaypalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
