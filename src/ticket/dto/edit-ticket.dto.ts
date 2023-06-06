import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema, model } from 'mongoose';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditTicketDto {
  @ApiProperty({
    default: 'in_progress',
    required: false,
    description: 'select a status from te list of available available status => open | in_progress | closed | resolved',
    example: 'in_progress',
  })
  @IsNotEmpty()
  @IsString()
  status: 'open' | 'in_progress' | 'closed' | 'resolved' = 'open';
}
