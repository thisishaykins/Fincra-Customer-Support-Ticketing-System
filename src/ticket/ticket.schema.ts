import * as mongoose from 'mongoose';

/*
 * Ticket Schema
 * ticket schema using Mongoose
 * [id, title, description, status, createBy, timestamp]
 * return schema object
*/ 
export const TicketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['open', 'in_progress', 'closed', 'resolved'],
      default: 'open',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
