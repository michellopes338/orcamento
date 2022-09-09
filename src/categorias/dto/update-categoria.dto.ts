import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdateCategoriaDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  label: string;
}
