import { IsAlpha, IsDecimal, IsEmpty, IsOptional } from 'class-validator';

export class UpdateReceitaDto {
  @IsEmpty()
  id: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  @IsDecimal()
  valor: number;

  @IsOptional()
  data: string;
}
