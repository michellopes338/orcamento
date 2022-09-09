import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class IdDespesaDto {
  @IsUUID()
  id: string;
}

export class ScopeDto {
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;
}
