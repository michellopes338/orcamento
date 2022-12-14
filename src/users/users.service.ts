import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { OutputUserDto } from './dto/output-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    return this.userModel.save(createUserDto);
  }

  async findOne(id: string): Promise<OutputUserDto | null> {
    const user = await this.userModel.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    const { password, is_superuser, ...response } = user;

    return response;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
