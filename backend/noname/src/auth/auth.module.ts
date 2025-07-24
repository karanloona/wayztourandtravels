import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM module
import { Users } from './users.entity'; // Import the TypeORM entity
import { AuthDao } from './auth.dao';
import { JwtClassModule } from '../database/jwt.module';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    JwtClassModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Users]), // Register the Users entity with TypeORM
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDao, LocalStrategy, JwtStrategy],
  exports: [AuthService, AuthDao],
})
export class AuthModule {}