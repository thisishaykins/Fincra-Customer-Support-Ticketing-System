import { Document, Schema, model } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// import { TicketSchema } from './ticket.schema';

/*
 * Ticket Model
 * {id, title, description, status, createBy, timestamp}
 * return model object
 */
export interface Ticket extends Document {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed' | 'resolved';
  createdBy: any;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<Ticket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'closed', 'resolved'],
      default: 'open',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }  ,
);

export const TicketModel = model<Ticket>('Ticket', TicketSchema);

