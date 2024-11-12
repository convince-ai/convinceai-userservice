import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class BaseDto {
  @ApiProperty({
    description: 'Criation date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Update date',
    example: '2021-10-14T01:43:00.658Z',
  })
  @IsString()
  updatedAt: Date;
}
