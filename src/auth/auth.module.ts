import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    ClientModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registra a estratégia JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Chave secreta para assinar os tokens
      // signOptions: { expiresIn: '1h' }, // Tempo de expiração do token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
