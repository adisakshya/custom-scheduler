import { CommonModule } from "./common/common.module";
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
