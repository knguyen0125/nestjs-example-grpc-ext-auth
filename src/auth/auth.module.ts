import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasicAuthProvider } from './provider/basic.auth-provider';
import { TokenService } from './token/token.service';
import { PassthroughAuthProvider } from './provider/passthrough.auth-provider';
import { ProviderDiscoveryService } from './provider-discovery/provider-discovery.service';
import { BaseAuthProvider } from './provider/base.auth-provider';

@Module({
  imports: [DiscoveryModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    BasicAuthProvider,
    TokenService,
    PassthroughAuthProvider,
    ProviderDiscoveryService,
    BaseAuthProvider,
  ],
})
export class AuthModule {}
