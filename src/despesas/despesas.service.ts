import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { ScopeDto } from './dto/despesas-util.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Despesa } from './entities/despesa.entity';

@Injectable()
export class DespesasService {
  constructor(
    @InjectRepository(Despesa) private despesaModel: Repository<Despesa>,
  ) {}

  async create(createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    return this.despesaModel.save(createDespesaDto);
  }

  async findAll(scope: ScopeDto): Promise<Despesa[]> {
    const { limit = 20, offset = 0 } = scope;

    return this.despesaModel.find({
      take: limit,
      skip: offset,
    });
  }

  async getTotalByMes(inicio_periodo: Date, fim_periodo: Date) {
    return await this.despesaModel
      .createQueryBuilder()
      .select('SUM(valor) AS total')
      .where({ data: Between(inicio_periodo, fim_periodo) })
      .getRawOne();
  }

  async getTotalByCategoria(inicio_periodo: Date, fim_periodo: Date) {
    return await this.despesaModel
      .createQueryBuilder()
      .select('descricao, SUM(valor)')
      .where({ data: Between(inicio_periodo, fim_periodo) })
      .groupBy('descricao')
      .getRawMany();
  }

  async findOne(id: string): Promise<Despesa> {
    return this.despesaModel.findOne({
      where: { id: id },
      relations: {
        categoria: true,
      },
      relationLoadStrategy: 'join',
    });
  }

  async findByData(inicio_periodo: Date, fim_periodo: Date) {
    return this.despesaModel.find({
      where: {
        data: Between(inicio_periodo, fim_periodo),
      },
      relationLoadStrategy: 'join',
      relations: {
        categoria: true,
      },
    });
  }

  async findByDescricao(descricao: string): Promise<Despesa[]> {
    return this.despesaModel.findBy({
      descricao: Like(`%${descricao}%`),
    });
  }

  async update(
    id: string,
    updateDespesaDto: UpdateDespesaDto,
  ): Promise<Despesa> {
    await this.despesaModel.update({ id: id }, { ...updateDespesaDto });

    return this.findOne(id);
  }

  async remove(id: string) {
    const despesa = await this.findOne(id);

    await this.despesaModel.delete({
      id: id,
    });

    return despesa;
  }
}
