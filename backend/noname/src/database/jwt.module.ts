import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true, // makes env variables accessible app-wide
      }),
      JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '43200s' },
        }),
      }),
    ],
  })
  export class JwtClassModule {}
  