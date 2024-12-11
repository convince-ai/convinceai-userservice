import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseDto from './base.dto';

export class ClientDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  cnpj: string

  @IsNotEmpty()
  phone: string
    
  @IsOptional()
  @IsString()
  id?: string

}
