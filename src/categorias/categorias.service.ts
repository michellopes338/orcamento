import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scope } from '../interface/query.interface';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) private categoriaModel: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaModel.save(createCategoriaDto);
  }

  async findAll(scope: Scope): Promise<Categoria[]> {
    const { limit = 20, offset = 0 } = scope;

    return this.categoriaModel.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne({ ...where }): Promise<Categoria> {
    const categoria = await this.categoriaModel.findOne({ where });

    return categoria;
  }

  async update(
    id: string,
    novas_infos: UpdateCategoriaDto,
  ): Promise<Categoria> {
    console.log(novas_infos);
    await this.categoriaModel.update({ id: id }, novas_infos);

    return this.findOne({ id: id });
  }

  async remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
