import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { UsersService } from '../services/users.service';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { PaginationParamsDto } from '../../../common/dto/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersDto } from '../dto/response/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const userFoundByEmail = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (userFoundByEmail)
      throw new BadRequestException('User already registered!');

    const newUser = await this.usersService.create({
      ...createUserDto,
    });

    return newUser;
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users.',
    type: [UsersDto],
  })
  findAll(@Query() paginationParams: PaginationParamsDto) {
    return this.usersService.findAll({
      limit: paginationParams.limit,
      page: paginationParams.page,
      orderByField: paginationParams.orderByField,
      orderByDirection: paginationParams.orderByDirection,
    });
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record.',
    type: UsersDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async findOne(@Param('id') id: string) {
    const userFound = await this.usersService.findOne(id);
    if (!userFound) throw new NotFoundException('User not found!');
    return userFound;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
