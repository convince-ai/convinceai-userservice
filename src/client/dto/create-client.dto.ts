import { OmitType } from '@nestjs/mapped-types';
import { ClientDto } from './client.dto';

export class CreateClientDto extends OmitType(ClientDto, [
    'createdAt',
    'updatedAt',
  ] as const) {}