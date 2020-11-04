import { Inject, Injectable, Logger } from '@nestjs/common';
import { ApiConfigService } from "../common/api-config.service";
import { Equal } from 'typeorm';
import { Notification } from '../database/entity/notification.entity';
import * as AWS from "aws-sdk";

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger("Scheduler Service");
  constructor(@Inject("AWS-SNS")
              private readonly sns: AWS.SNS,
              private readonly configService: ApiConfigService) {}

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
    // Foward each notification
    for(let i=0; i<count; i++) {
      this.forwardNotifications(notifications[i]);
    }
    return `Scheduled ${count} notifications`;
  }

  private async forwardNotifications(notification: Notification): Promise<void> {
    const notificationData = JSON.parse(notification.notificationData);
    this.sns.publish({
        Message: JSON.stringify({
            userId: notification.userId,
            userEmail: notificationData.userEmail,
            itemId: notificationData.reminderId,
            eventData: notificationData
        }),
        MessageAttributes: {
            eventItemType: {
                DataType: 'String',
                StringValue: 'notification'
            },
            eventType: {
                DataType: 'String',
                StringValue: 'notification:send'
            },
            userId: {
                DataType: 'String',
                StringValue: notification.userId
            }
        },
        TopicArn: this.configService.notificationTopicArn
    }).promise();
  }
}
