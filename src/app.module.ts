import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './auth/user-auth.module';
import { ThreadsModule } from './threads/threads.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserAuthModule,
    ThreadsModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
