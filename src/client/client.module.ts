import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'db/prisma.service';
import { ClientRepository } from './repository/client.repository';

@Module({
  controllers: [ClientController],
  providers: [PrismaService,ClientRepository,ClientService],
  exports: [ClientService],
})
export class ClientModule {}
