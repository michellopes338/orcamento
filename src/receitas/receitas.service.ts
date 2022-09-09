import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receitas } from '../receitas/entities/receita.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateReceitaDto, IdReceitaDto, UpdateReceitaDto } from './dto';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receitas) private receitaModel: Repository<Receitas>,
  ) {}

  async getReceitaById(id: IdReceitaDto) {
    return await this.receitaModel.findOneBy({ id: String(id.id) });
  }

  async getReceitas(limit: number, offset: number): Promise<Receitas[]> {
    return await this.receitaModel.find({
      take: limit,
      skip: offset,
    });
  }

  getTotalByMes(inicio_periodo: Date, fim_periodo: Date) {
    return this.receitaModel
      .createQueryBuilder()
      .select('SUM(valor) AS total')
      .where({ data: Between(inicio_periodo, fim_periodo) })
      .getRawOne();
  }

  async getReceitasByData(
    inicio_periodo: Date,
    fim_periodo: Date,
  ): Promise<Receitas[]> {
    // retorna todas as receitas dentro de um mês
    return await this.receitaModel.find({
      where: {
        data: Between(inicio_periodo, fim_periodo),
      },
    });
  }

  async insertReceita(receita: CreateReceitaDto): Promise<Receitas> {
    return await this.receitaModel.save(receita);
  }

  async updateReceita(
    atualizacao_de_receita: UpdateReceitaDto,
    id: IdReceitaDto,
  ): Promise<Receitas> {
    await this.receitaModel.update(
      { id: id.id },
      { ...atualizacao_de_receita },
    );

    return this.getReceitaById(id);
  }

  async findByDescricao(descricao: string) {
    return await this.receitaModel.findBy({
      descricao: Like(`%${descricao}%`),
    });
  }

  async removeReceita(id: IdReceitaDto) {
    const despesa = await this.getReceitaById(id);

    await this.receitaModel.delete({
      id: id.id,
    });

    return despesa;
  }
}
