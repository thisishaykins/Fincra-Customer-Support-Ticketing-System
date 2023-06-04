import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Enter a name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
