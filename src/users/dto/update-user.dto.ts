import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmpty()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(8, 64)
  password?: string;

  @IsOptional()
  @IsBoolean()
  is_superuser?: boolean;
}
