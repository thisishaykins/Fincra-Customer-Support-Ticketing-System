import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketModel } from './ticket.model';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UserSchema } from '../user/user.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ticket', schema: TicketModel.schema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [TicketController],
  providers: [TicketService, UserService, AuthService, JwtService],
})
export class TicketModule {}
