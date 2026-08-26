import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const data = {
      username: 'asdf',
      password: 'pass',
      email: 'asd@jad.com'
    }
    return this.authService.register(data);
  }

  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const data = {
      username: 'asdf',
      password: 'pass'
    }
    return this.authService.login(data);
  }
}
