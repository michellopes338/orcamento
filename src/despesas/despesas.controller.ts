import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  ParseUUIDPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { ScopeDto } from './dto/despesas-util.dto';
import { CategoriasService } from '../categorias/categorias.service';

@Controller('despesas')
export class DespesasController {
  constructor(
    private readonly despesasService: DespesasService,
    private readonly categoriasService: CategoriasService,
  ) {}

  @Post()
  async create(@Body() createDespesaDto: CreateDespesaDto) {
    createDespesaDto.categoria = await this.categoriasService.findOne({
      label: createDespesaDto.categoria ? createDespesaDto.categoria : 'Outras',
    });
    const [dia, mes, ano] = String(createDespesaDto.data).split('/');

    const anoFixed = ano.length < 4 ? `20${ano}` : ano;

    createDespesaDto.data = new Date(
      Number(anoFixed),
      Number(mes) - 1,
      Number(dia),
    );

    createDespesaDto.descricao = createDespesaDto.descricao.toLowerCase();

    const nova_despesa = await this.despesasService
      .create(createDespesaDto)
      .catch((error) => {
        throw new InternalServerErrorException(error.detail);
      });

    return nova_despesa;
  }

  @Get(':ano/:mes')
  async getByData(@Param('ano') ano: number, @Param('mes') mes: number) {
    const inicio_periodo: Date = new Date(ano, mes - 1, 1);
    const fim_periodo: Date = new Date(ano, mes, 0);

    const receitas = this.despesasService.findByData(
      inicio_periodo,
      fim_periodo,
    );

    return receitas;
  }

  @Get('/all')
  async findAll(@Query() scope: ScopeDto) {
    const despesas = this.despesasService.findAll(scope).catch((error) => {
      console.log(error.detail);
      if (error instanceof HttpException) {
        throw new InternalServerErrorException();
      }
    });

    return despesas;
  }

  @Get()
  async findByDescricao(@Query('descricao') descricao: string) {
    const despesa = this.despesasService.findByDescricao(
      descricao.toLowerCase(),
    );

    return despesa;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const despesa = this.despesasService.findOne(id).catch((error) => {
      console.log(error.detail);
      if (error instanceof HttpException) {
        throw new InternalServerErrorException();
      }
    });

    return despesa;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDespesaDto: UpdateDespesaDto,
  ) {
    await this.despesasService.update(id, updateDespesaDto);

    return this.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const despesa_removia = this.despesasService.remove(id).catch((error) => {
      console.log(error.detail);
      if (error instanceof HttpException) {
        throw new InternalServerErrorException();
      }
    });

    return despesa_removia;
  }
}
