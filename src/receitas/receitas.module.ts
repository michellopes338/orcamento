import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaService } from './receitas.service';
import { ReceitaController } from '../receitas/receitas.controller';
import { Receitas } from '../receitas/entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receitas])],
  providers: [ReceitaService],
  controllers: [ReceitaController],
  exports: [ReceitaService],
})
export class ReceitaModule {}
