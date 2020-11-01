import { CommonModule } from "./common/common.module";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiConfigService } from "./common/api-config.service";
import { SchedulerService } from './scheduler/scheduler.service';
import { Notification } from './database/entity/notification.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync({
              useFactory: (config: ApiConfigService) => ({
                  type: 'postgres',
                  username: config.dbUser,
                  database: config.dbName,
                  password: config.dbPassword,
                  host: config.dbHost,
                  entities: [Notification],
                  logging: !config.isProduction,
                  synchronize: false,
              }),
              imports: [CommonModule],
              inject: [ApiConfigService]
            }),
            CommonModule
          ],
  controllers: [],
  providers: [SchedulerService],
})
export class AppModule {}
