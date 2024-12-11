import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../client/client.service';
import * as bcrypt from 'bcryptjs';
import { CreateClientDto } from '../client/dto/create-client.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Busca o usuário pelo e-mail
    const user = await this.clientService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email'); // mudar para 'Invalid email or password'
    }
    // Compara a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Retorna o usuário sem o campo "password"
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createClientDto: CreateClientDto) {
    const hashedPassword = await bcrypt.hash(createClientDto.password, 10);
    return this.clientService.create({
      ...createClientDto,
      password: hashedPassword,
    });
  }
}
