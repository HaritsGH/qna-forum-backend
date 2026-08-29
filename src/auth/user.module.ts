import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, AuthRepository, PrismaService],
})
export class UserModule {}
