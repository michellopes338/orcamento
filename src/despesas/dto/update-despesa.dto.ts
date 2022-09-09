import { IsAlpha, IsDecimal, IsEmpty, IsOptional } from 'class-validator';

export class UpdateDespesaDto {
  @IsEmpty()
  id: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  @IsDecimal()
  valor: number;

  @IsOptional()
  @IsAlpha()
  mes: string;
}
