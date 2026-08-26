import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    console.log(registerAuthDto)
    return registerAuthDto
  }

  async login(username: string) {
    console.log(username)
    return {
      username: 'qwer',
      password: 'pass',
    };
    // return this.prisma.user.findUnique({
    //   where: { username },
    //   select: {
    //     id: true,
    //     username: true,
    //     password: true
    //   }
    // });
  }

  async checkUsernameExist(username: string) {
    return this.prisma.user.findUnique({
      where: { username }
    })
  }
  
  async checkEmailExist(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async updateToken(username: string, sessionToken: string) {
    return this.prisma.user.update({
      where: { username },
      data: { sessionToken }
    })
  }
}
