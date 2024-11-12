import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const data: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.repository.create(data);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll({ limit, page, orderByField, orderByDirection }) {
    return await this.repository.findAll({
      limit,
      page,
      orderByField,
      orderByDirection,
    });
  }

  async findOne(id: string) {
    const userFound = await this.repository.findOne(id);

    return {
      ...userFound,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const userFoundByEmail = await this.repository.findByEmail(
        updateUserDto.email,
      );

      if (userFoundByEmail)
        throw new BadRequestException('E-mail already registered!');
    }

    return await this.repository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.repository.update(id, { isActive: false });
  }
}
