import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyDao } from './company.dao';
import { AuthModule } from '../auth/auth.module';
import { JwtClassModule } from '../database/jwt.module';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM module
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { Users } from '../auth/users.entity'; // Import the TypeORM Users entity

@Module({
  imports: [
    AuthModule,
    JwtClassModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ Users]), // Register Company and Users entities
  ],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy],
})
export class CompanyModule {}