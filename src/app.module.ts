import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/user.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [UserModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
