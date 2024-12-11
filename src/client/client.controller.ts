import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Aplica autenticação JWT a todas as rotas
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Rota para criar um cliente
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const createdUser = await this.clientService.create(createClientDto);
    return {...createdUser, password: undefined};
  }

  // Rota para listar todos os clientes
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  // Rota para buscar um cliente específico por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  // Rota para atualizar um cliente específico
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  // Rota para remover um cliente específico
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
