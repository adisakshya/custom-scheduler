import { Module } from '@nestjs/common';
import { ApiConfigService } from '../common/api-config.service';
import { SchedulerService } from './scheduler.service';
import { SNS } from 'aws-sdk';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [SchedulerService],
  imports: [CommonModule],
  exports: [SchedulerService]
})
export class SchedulerModule {}
