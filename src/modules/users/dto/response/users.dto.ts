import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';
import BaseDto from '../../../../common/dto/base.dto';
import { IsExactLengthNumber } from '../../../../common/validators/IsExactLengthNumber';

export class UsersDto extends BaseDto {
  @ApiProperty({
    description: 'id',
    example: '3f620513-42bd-4670-a731-e80c939ed9e4',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Ana Clara',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Último nome do funcionário',
    example: 'Silva',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'E-mail do funcionário',
    example: 'anaclara.silva@uol.com',
  })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Código DDD do contato do usuário',
    example: '012',
  })
  @IsInt()
  @IsExactLengthNumber(3)
  ddd: number;

  @ApiProperty({
    description: 'Número/contato do WhatsApp',
    example: '991208417',
  })
  @IsInt()
  @IsExactLengthNumber(9)
  whatsappNumber: number;

  @ApiProperty({
    description: 'Se o usurário está ativo no sistema',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
