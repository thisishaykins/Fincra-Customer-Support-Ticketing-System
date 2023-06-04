import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users') // Add an API tag for Swagger documentation
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Implement other endpoints...
}
