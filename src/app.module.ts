import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [AuthModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
