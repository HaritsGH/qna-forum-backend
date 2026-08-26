import { IsEmail, IsString } from "class-validator"

export class LoginAuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RegisterAuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}