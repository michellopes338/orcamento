import { IsDecimal, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Categoria } from '../../categorias/entities/categoria.entity';

export class CreateDespesaDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  @IsDecimal()
  valor: number;

  @IsNotEmpty()
  data: Date | string;

  @IsOptional()
  categoria: Categoria;
}
