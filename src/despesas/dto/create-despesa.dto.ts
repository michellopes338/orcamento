import {
  IsAlpha,
  IsDecimal,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
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
  @IsAlpha()
  mes: string;

  @IsOptional()
  categoria: Categoria;
}
