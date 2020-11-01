import { Injectable, Logger } from '@nestjs/common';
import { Notification } from '../database/entity/notification.entity';

@Injectable()
export class SchedulerService {
  constructor() {}
  
  async scheduleNotifications(): Promise<string> {
    const [notifications, count] = await Notification.findAndCount({
      where: {
        id: '1234'
      }
    });
    return `Scheduled ${count} notifications`;
  }
}
