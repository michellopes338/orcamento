import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  label: string;
}
