import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string): Promise<Despesa> {
    return this.despesaModel.findOne({
      where: { id: id },
      relations: {
        categoria: true,
      },
      relationLoadStrategy: 'join',
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
