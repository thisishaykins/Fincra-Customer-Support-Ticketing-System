import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { TicketService } from './ticket.service';
import { Ticket } from './ticket.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { EditTicketDto } from './dto/edit-ticket.dto';

@ApiTags('tickets') // Add an API tag for Swagger documentation
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: 'create a ticket request' })
  @ApiResponse({ description: 'Endpoint to create a ticket request by a user' })
  @ApiBody({ type: CreateTicketDto }) // Specify the body parameter type for Swagger documentation
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  @Get()
  @ApiOperation({ summary: 'get all tickets requests' })
  @ApiResponse({ description: 'Endpoint to get all tickets request' })
  @ApiParam({ name: 'page', type: String })
  getAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a ticket request' })
  @ApiResponse({ description: 'Endpoint to get a ticket request' })
  @ApiParam({ name: 'id', type: String })
  getTicket(@Param('id') id: number | string): Promise<Ticket[]> {
    return this.ticketService.findById(id);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'get a user ticket requests' })
  @ApiResponse({ description: 'Endpoint to get ticket requests by a user' })
  @ApiParam({ name: 'userId', type: String })
  ticketsByUser(@Param('userId') userId: number | string): Promise<Ticket[]> {
    return this.ticketService.findByUserTickets(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket request' })
  @ApiResponse({ description: 'Endpoint to update ticket request by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: EditTicketDto }) // Specify the body parameter type for Swagger documentation
  updateTicket(@Param('id') id: number | string, @Body() ticket: Ticket) {
    return this.ticketService.findByIdAndUpdate(id, ticket);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket request' })
  @ApiResponse({ description: 'Endpoint to delete ticket request by id' })
  @ApiParam({ name: 'id', type: String })
  deleteTicket(@Param('id') id: number | string) {
    return this.ticketService.deletedTicket(id);
  }
}
