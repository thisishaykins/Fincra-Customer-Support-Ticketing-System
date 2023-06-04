import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/user.schema';

// Load environment variables from .env file into this module
dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your own secret key
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
