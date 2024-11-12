import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../system/database/prisma.service';
import { UsersDto } from '../dto/response/users.dto';
import { CreateUserDto } from '../dto/request/create-user.dto';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from '../../../common/pagination';
import { UpdateUserDto } from '../dto/request/update-user.dto';

const USER_PROJECTION = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  ddd: true,
  whatsappNumber: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UsersDto> {
    return await this.prisma.users.create({ data });
  }

  async findAll({
    limit,
    page,
    orderByField,
    orderByDirection,
  }): Promise<PaginatedResult<UsersDto>> {
    const paginate: PaginateFunction = paginator({ perPage: limit });

    const where = { isActive: true };
    const orderBy = {
      [orderByField]: orderByDirection,
    };

    return paginate(
      this.prisma.users,
      {
        where,
        orderBy,
        select: USER_PROJECTION,
      },
      {
        page,
      },
    );
  }

  async findOne(id: string): Promise<Omit<UsersDto, 'password'> | null> {
    return await this.prisma.users.findUnique({
      where: { id, isActive: true },
      select: USER_PROJECTION,
    });
  }

  async findByEmail(email: string): Promise<UsersDto | null> {
    return await this.prisma.users.findUnique({
      where: { email, isActive: true },
    });
  }
  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.users.delete({ where: { id } });
  }
}
