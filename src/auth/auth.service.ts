import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userService.createUser(registerDto);
    return user;
  }

  //   async register(user: User): Promise<User> {
  //     return this.userService.create(user);
  //   }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    const userExists = await this.userService.findByEmail(user.email);

    if (
      !userExists ||
      !this.userService.comparePassword(user.password, userExists.password)
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: userExists.id, email: userExists.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (
      user &&
      (await this.userService.comparePassword(password, user.password))
    ) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUserById(userId: string): Promise<User> {
    const user = await this.userService.findById(userId);

    if (user) {
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  //   async login(user: LoginDto): Promise<{ accessToken: string }> {
  //     const payload: JwtPayload = { email: user.email };
  //     const accessToken = this.jwtService.sign(payload);

  //     return { accessToken };
  //   }

  async getUserFromToken(token: string): Promise<User> {
    const payload: JwtPayload = this.jwtService.verify(token);
    const user = await this.userService.findByEmail(payload.email);

    if (user) {
      return user;
    }

    throw new UnauthorizedException('Invalid user');
  }

  getUserIdFromAccessToken(accessToken: string | string[]): string {
    let token: string;

    if (Array.isArray(accessToken)) {
      token = accessToken[0]; // Extract the first token from the array
    } else {
      token = accessToken; // Use the token as is if it's a single string
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.sub;
      return userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
