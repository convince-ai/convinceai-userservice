import { Request } from 'express';
import { UsersDto } from '../../Users/dto/response/users.dto';

export interface AuthRequest extends Request {
  user: UsersDto;
}
