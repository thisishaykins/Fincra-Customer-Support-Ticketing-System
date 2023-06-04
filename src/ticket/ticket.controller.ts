import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';

import { TicketService } from './ticket.service';
import { AuthService } from 'src/auth/auth.service';
import { Ticket } from './ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { EditTicketDto } from './dto/edit-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Tickets') // Add an API tag for Swagger documentation
@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'create a ticket request' })
  @ApiResponse({ description: 'Endpoint to create a ticket request by a user' })
  @ApiBody({ type: CreateTicketDto }) // Specify the body parameter type for Swagger documentation
  create(@Body() ticket: Ticket, @Req() request: Request): Promise<Ticket> {
    const { accessToken } = request.headers;
    const userId = this.authService.getUserIdFromAccessToken(accessToken);
    // You can now use the userId and createTicketDto to create a ticket
    return this.ticketService.create(ticket);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get all tickets requests' })
  @ApiResponse({ description: 'Endpoint to get all tickets request' })
  @ApiParam({ name: 'page', type: String })
  getAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get a ticket request' })
  @ApiResponse({ description: 'Endpoint to get a ticket request' })
  @ApiParam({ name: 'id', type: String })
  getTicket(@Param('id') id: number | string): Promise<Ticket[]> {
    return this.ticketService.findById(id);
  }

  @Get('/user/:userId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get a user ticket requests' })
  @ApiResponse({ description: 'Endpoint to get ticket requests by a user' })
  @ApiParam({ name: 'userId', type: String })
  ticketsByUser(@Param('userId') userId: number | string): Promise<Ticket[]> {
    return this.ticketService.findByUserTickets(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a ticket request' })
  @ApiResponse({ description: 'Endpoint to update ticket request by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: EditTicketDto }) // Specify the body parameter type for Swagger documentation
  updateTicket(@Param('id') id: number | string, @Body() ticket: Ticket) {
    return this.ticketService.findByIdAndUpdate(id, ticket);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a ticket request' })
  @ApiResponse({ description: 'Endpoint to delete ticket request by id' })
  @ApiParam({ name: 'id', type: String })
  deleteTicket(@Param('id') id: number | string) {
    return this.ticketService.deletedTicket(id);
  }
}
