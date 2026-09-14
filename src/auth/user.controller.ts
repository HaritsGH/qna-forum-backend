import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthRepository } from './auth.repository';


@Controller('user')
export class UserController {
  constructor(private readonly authRepository: AuthRepository) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    try {
      return this.authRepository.getUserInfoById(+id);
    } catch {
      return {message: 'unexpected error'}
    }
    
  }
}
