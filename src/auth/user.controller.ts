import { Controller, Get, Param } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Controller('users')
export class UserController {
  constructor(private readonly authRepository: AuthRepository) {}

  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    try {
      return this.authRepository.getUserInfoById(+id);
    } catch {
      return {message: 'unexpected error'}
    }
    
  }
}
