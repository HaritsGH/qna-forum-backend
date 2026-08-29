import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(registerAuthDto: RegisterAuthDto) {
    // Check username uniqueness
    const existingUsername = await this.authRepository.checkUsernameExist(registerAuthDto.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check email uniqueness
    const existingEmail = await this.authRepository.checkEmailExist(registerAuthDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(registerAuthDto.password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string));
    
    return await this.authRepository.register({...registerAuthDto, password: hashedPassword}); 
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.authRepository.login(loginAuthDto.username)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const newToken = 'sseison_token_awikwok'

    await this.authRepository.updateToken(loginAuthDto.username, newToken)
    
    return {
      token: newToken,
      message: 'Login success.'
    };
  }
}
