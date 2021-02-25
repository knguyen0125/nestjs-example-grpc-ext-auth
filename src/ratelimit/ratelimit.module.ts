import { Module } from '@nestjs/common';
import { RatelimitService } from './ratelimit.service';

@Module({
  providers: [RatelimitService]
})
export class RatelimitModule {}
