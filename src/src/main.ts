import { NestFactory } from '@nestjs/core';
import { Context, Handler } from "aws-lambda";
import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { SchedulerService } from './scheduler/scheduler.service';

async function bootstrapServer(): Promise<INestApplication> {
    const nestApp = await NestFactory.create<NestFastifyApplication>(
        AppModule, 
        new FastifyAdapter({ logger: true })
    );
    return nestApp;
}

export const handler: Handler = async (event: any, context: Context) => {
    const appServer = await bootstrapServer();
    const appService = appServer.get(SchedulerService);
    const result = await appService.scheduleNotifications();
    console.log('Execution Result:', result);
}
