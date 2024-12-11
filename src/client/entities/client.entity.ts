import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ nullable: true })
  idade: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 }) // Permissão padrão (0 - usuário comum, 1 - admin)
  permission: number;
}
