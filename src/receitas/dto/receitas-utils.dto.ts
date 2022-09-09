import { IsUUID } from 'class-validator';

export class IdReceitaDto {
  @IsUUID('all')
  id: string;
}
