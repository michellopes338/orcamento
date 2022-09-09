import { IsNotEmpty, IsDecimal, IsEmpty } from 'class-validator';

export class CreateReceitaDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  @IsDecimal()
  valor: number;

  @IsNotEmpty()
  data: string | Date;
}
