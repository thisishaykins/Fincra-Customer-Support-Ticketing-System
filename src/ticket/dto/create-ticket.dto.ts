import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    required: true,
    description: 'Enter the title of the ticket issue...',
    example: 'Issue with AWS Cloud',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    description: 'Enter the description of the ticket issue...',
    example: 'I am unable to log in to my AWS DevOps account.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    default: 'open',
    required: false,
    description: 'select a status from te list of available available status => open | in_progress | closed | resolved',
    example: 'open',
  })
  status: 'open' | 'in_progress' | 'closed' | 'resolved' = 'open';

  @ApiProperty({
    required: true,
    example: 'user_id_here',
  })
  createdBy: any;
}
