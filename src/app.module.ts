import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RatelimitModule } from './ratelimit/ratelimit.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [AuthModule, RatelimitModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
