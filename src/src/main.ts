import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from "aws-lambda";
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import * as Express from 'express';
import { AppModule } from './app.module';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
    const expressApp = Express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await nestApp.init();
    return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
    if(!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}
