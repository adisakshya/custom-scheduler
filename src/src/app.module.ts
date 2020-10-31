import { CommonModule } from "./common/common.module";
import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [SchedulerService],
})
export class AppModule {}
