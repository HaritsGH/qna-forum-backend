import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const res = registerAuthDto
    res['id'] = 'U00'
    console.log(res)
    return res
  }

  async login(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        passwordHash: true
      }
    })
  }

  async checkUsernameExist(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true
      }
    })
  }
  
  async checkEmailExist(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        email: true
      }
    })
  }

  async getUserInfoById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true
      }
    })
  }

  async updateToken(username: string, sessionToken: string) {
    return this.prisma.user.update({
      where: { username },
      data: { sessionToken }
    })
  }
}
