import { Controller, Get, Param } from '@nestjs/common';
import { AuthRepository } from './auth.repository';


@Controller('user')
export class UserController {
  constructor(private readonly authRepository: AuthRepository) {}

  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    try {
      return await this.authRepository.getUserInfoById(+id);
    } catch {
      return {message: 'unexpected error'}
    }
    
  }
}
