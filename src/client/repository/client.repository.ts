import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientDto } from '../dto/client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto): Promise<ClientDto> {
    const clientData: any = {
      ...data,
    };
    return await this.prisma.client.create({ data: clientData });
  }

  async findAll() {
    return await this.prisma.client.findMany();
  }

  async findOne(id: string): Promise<Omit<ClientDto, 'password'> | null> {
    return await this.prisma.client.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<ClientDto | null> {
    return await this.prisma.client.findUnique({
      where: { email },
    });
  }
  async update(id: string, data: UpdateClientDto) {
    return await this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
