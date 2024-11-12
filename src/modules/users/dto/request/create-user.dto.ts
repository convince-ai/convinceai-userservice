import { OmitType } from '@nestjs/swagger';
import { UsersDto } from '../response/users.dto';

export class CreateUserDto extends OmitType(UsersDto, [
  'createdAt',
  'updatedAt',
] as const) {}
