import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/users.repository';
import { PrismaService } from '../../system/database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UserRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
