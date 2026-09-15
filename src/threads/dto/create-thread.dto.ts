import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateThreadDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;
}
