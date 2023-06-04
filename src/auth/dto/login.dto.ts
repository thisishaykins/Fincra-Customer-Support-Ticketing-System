import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    description: 'Enter an email...',
    example: 'john_doe@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    description: 'Enter a valid password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
