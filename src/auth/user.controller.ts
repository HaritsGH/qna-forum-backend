import { Controller, Get, Param } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('user')
export class UserController {
  constructor(private readonly authRepository: AuthRepository) {}

  @Get(':id')
  @ApiOperation({ summary: 'Fetch user public information' })
  @ApiResponse({ status: 200, description: 'Fetch user public information'})
  async getUserInfo(@Param('id') id: string) {
    try {
      return {
        message: 'Public user info fetch success.',
        statusCode: '200',
        data: await this.authRepository.getUserInfoById(+id)
      };
    } catch {
      return {message: 'unexpected error'}
    }
    
  }
}
