import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from '../user/user.model';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication') // Add an API tag for Swagger documentation
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ description: 'Endpoint to create a user' })
  @ApiBody({ type: RegisterDto }) // Specify the body parameter type for Swagger documentation
  register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ description: 'Endpoint to login a user' })
  @ApiBody({ type: LoginDto }) // Specify the body parameter type for Swagger documentation
  login(@Body() user: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }
}
