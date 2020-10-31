import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from "aws-lambda";
import * as Express from 'express';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { AppService } from './app.service';

async function bootstrapServer(): Promise<INestApplication> {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(Express()));
    return nestApp;
}

export const handler: Handler = async (event: any, context: Context) => {
    const appServer = await bootstrapServer();
    const appService = appServer.get(AppService);
    const result = appService.getHello();
    console.log('Execution Result:', result);
}
