import { IsBoolean, IsEmail, IsEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: string;

  @IsEmail()
  email: string;

  @Length(8, 64)
  password: string;

  @IsEmpty()
  is_superuser: boolean;
}

export class CreateSuperuserDto {
  @IsEmpty()
  id: string;

  @IsEmail()
  email: string;

  @Length(8, 64)
  password: string;

  @IsBoolean()
  is_superuser: boolean;
}
