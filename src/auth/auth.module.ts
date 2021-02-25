import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Basic } from './provider/basic';
import { TokenService } from './token/token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Basic, TokenService],
})
export class AuthModule {}
