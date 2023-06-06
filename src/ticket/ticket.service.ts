import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ticket, TicketModel } from './ticket.model';

/*
 * Ticket Service
 * implementing the CRUD operations:
 * 
 * 
*/ 
@Injectable()
export class TicketService {
  constructor(
    @InjectModel('Ticket') private readonly ticketModel: Model<Ticket>,
  ) {}

  /* create ticket service
   * ticket: [title, description, status, createBy]
   * @return ticket obj
   */
  async create(ticket: Ticket): Promise<Ticket> {
    const createdTicket = new this.ticketModel(ticket);
    return createdTicket.save();
  }

  /* find all ticket service
   * @return ticket objs
   */
  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  /* find ticket by id service
   * @param: ticketId
   * @return ticket obj
   */
  async findById(ticketId): Promise<Ticket[]> {
    return this.ticketModel.findById(ticketId);
  }

  /* find ticket by user_id service
   * @param: ticketId
   * @return ticket objs
   */
  async findByUserTickets(userId): Promise<Ticket[]> {
    return this.ticketModel.find({ createdBy: userId });
  }

  /* find ticket by id and update service
   * @param: ticketId
   * @param: ticketData
   * @return ticket objs
   */
  async findByIdAndUpdate(ticketId, ticketData = {}): Promise<Ticket[]> {
    // ticketData={ status: 'resolved' }
    return this.ticketModel.findByIdAndUpdate(ticketId, ticketData, {
      new: true,
    });
  }

  /* find ticket by id and delete service
   * @param: ticketId
   */
  async deletedTicket(ticketId): Promise<Ticket[]> {
    return this.ticketModel.findByIdAndDelete(ticketId);
  }
}
