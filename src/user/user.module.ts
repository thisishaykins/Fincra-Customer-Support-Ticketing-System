import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel.schema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
