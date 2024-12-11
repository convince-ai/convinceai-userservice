import { IsString } from 'class-validator';

export default class BaseDto {
  
    @IsString()
    createdAt: Date;

    @IsString()
    updatedAt: Date;

    @IsString()
    tenantId: string;
}