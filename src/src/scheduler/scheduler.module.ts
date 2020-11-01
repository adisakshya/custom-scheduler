import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Module({
  providers: [SchedulerService],
  controllers: [SchedulerService],
})
export class UsersModule {}
