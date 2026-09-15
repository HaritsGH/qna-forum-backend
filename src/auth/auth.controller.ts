import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    try {
      // const data = {
      //   username: 'asdf',
      //   password: 'pass',
      //   email: 'asd@jad.com'
      // }
      return await this.authService.register(registerAuthDto);
    } catch (error) {
      throw error
    }
    
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      // const data = {
      //   username: 'asdf',
      //   password: 'pss',
      // }
      return await this.authService.login(loginAuthDto);
    } catch (error) {
      throw error
    }
  }
}
