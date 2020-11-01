import { Injectable, Logger } from '@nestjs/common';
import { Equal } from 'typeorm';
import { Notification } from '../database/entity/notification.entity';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger("Scheduler Service");
  constructor() {}

  async scheduleNotifications(): Promise<string> {
    const currentTime = new Date().toUTCString();
    const targetTime = new Date(new Date(currentTime).setSeconds(0, 0) + 1000 * 60);
    this.logger.log(`Current Time is ${currentTime}`);
    this.logger.log(`Getting notifications scheduled for ${targetTime}`);
    const [notifications, count] = await Notification.findAndCount({
      where: {
        deliverAt: Equal(targetTime)
      }
    });
    return `Scheduled ${count} notifications`;
  }
}
