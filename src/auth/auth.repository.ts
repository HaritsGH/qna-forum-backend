import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    console.log(registerAuthDto)
    const a = await this.prisma.user.upsert({
      where: {
        email: registerAuthDto.email
      },
      update: {

      },
      create: {
        username: registerAuthDto.username,
        passwordHash: registerAuthDto.password,
        email: registerAuthDto.email
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    })
    return {...a, id: `U00${a.id}`}
  }

  async login(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        passwordHash: true
      }
    })
  }

  async checkUsernameExist(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true
      }
    })
  }
  
  async checkEmailExist(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        email: true
      }
    })
  }

  async getUserInfoById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true
      }
    })
  }

  async updateToken(username: string, sessionToken: string) {
    return await this.prisma.user.update({
      where: { username },
      data: { sessionToken }
    })
  }
}
