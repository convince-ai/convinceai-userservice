import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repository/client.repository';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ClientDto> {
  // Apenas salve o valor recebido; não processe novamente
    return await this.clientRepository.create(createClientDto);
  }

  async findAll(): Promise<any> {
    return await this.clientRepository.findAll();
  }

  async findOne(id: string): Promise<any> {
    return await this.clientRepository.findOne(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<any> {
    return await this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: string): Promise<any> {
    return await this.clientRepository.remove(id);
  }

  async findByEmail(email: string): Promise<any> {
    return await this.clientRepository.findByEmail( email );
  }
  
}
