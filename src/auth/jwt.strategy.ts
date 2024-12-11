import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho Authorization
      ignoreExpiration: false, // Rejeita tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret', // Mesma chave usada no JwtModule
    });
  }

  async validate(payload: any) {
    // Retorna o payload válido (ou pode buscar mais informações no banco se necessário)
    return { userId: payload.sub, email: payload.email };
  }
}
