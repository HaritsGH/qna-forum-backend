import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'Register success.'})
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    try {
      return await this.authService.register(registerAuthDto);
    } catch (error) {
      throw error
    }
    
  }

  @Post('login')
  @ApiOperation({ summary: 'Logins user' })
  @ApiResponse({ status: 201, description: 'Login success.'})
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      return await this.authService.login(loginAuthDto);
    } catch (error) {
      throw error
    }
  }
}
