import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  InternalServerErrorException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Public } from '../roles/roles.decorator';
import { Scope } from '../interface/query.interface';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(
    @Body() createCategoriaDto: CreateCategoriaDto,
    @Request() req: any,
  ) {
    const { user } = req;

    if (!user.is_superuser) {
      throw new UnauthorizedException(
        'Você não possui permissão para executar essa ação',
      );
    }

    const nova_categoria = await this.categoriasService
      .create(createCategoriaDto)
      .catch((error) => {
        throw new InternalServerErrorException(error.detail);
      });

    return nova_categoria;
  }

  @Public()
  @Get()
  async findAll(@Query() scope: Scope) {
    const categorias = this.categoriasService.findAll(scope).catch((error) => {
      throw new InternalServerErrorException(error.detail);
    });

    return categorias;
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.findOne({ id: id }).catch((error) => {
      throw new InternalServerErrorException(error.detail);
    });
  }

  @Patch(':id')
  async update(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateCategoriaDto: UpdateCategoriaDto,
  ) {
    console.log(UpdateCategoriaDto);
    const { user } = req;

    if (!user.is_superuser) {
      throw new UnauthorizedException();
    }

    const categoria_atualizada = this.categoriasService
      .update(id, UpdateCategoriaDto)
      .catch((error) => {
        throw new InternalServerErrorException(error.detail);
      });

    return categoria_atualizada;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const { user } = req;

    if (!user.is_superuser) {
      throw new UnauthorizedException();
    }

    return this.categoriasService.remove(+id);
  }
}
