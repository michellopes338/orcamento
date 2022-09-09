import { IsNotEmpty, IsDecimal, IsAlpha, IsEmpty } from 'class-validator';

export class CreateReceitaDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  @IsDecimal()
  valor: number;

  @IsNotEmpty()
  @IsAlpha()
  mes_da_receita: string;
}
