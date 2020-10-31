import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerService {
  getHello(): string {
    return "I'm Scheduler!";
  }
}
