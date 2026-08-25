import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  register(registerAuthDto: RegisterAuthDto) {
    return 'This is action register';
  }

  login(loginAuthDto: LoginAuthDto) {
    return `This is action login`;
  }

  logout(req) {
    return `This is action logout`
  }
}
