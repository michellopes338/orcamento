import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Query,
  Param,
  Put,
  Delete,
  ParseEnumPipe,
  BadRequestException,
} from '@nestjs/common';
import { CreateReceitaDto, IdReceitaDto, UpdateReceitaDto } from './dto';
import { Receitas } from '../receitas/entities/receita.entity';
import { ReceitaService } from './receitas.service';
import { Scope } from 'src/interface/query.interface';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Get('all')
  async getAllReceitas(@Query() scope: Scope): Promise<Receitas[]> {
    const { limit = 20, offset = 0 } = scope;

    try {
      return this.receitaService.getReceitas(limit, offset);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'algo deu errado, tente novamente mais tarde',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getReceitaById(@Param() id: IdReceitaDto): Promise<Receitas> {
    try {
      return this.receitaService.getReceitaById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'algo deu errado, tente novamente mais tarde',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':ano/:mes')
  async getReceitaByData(@Param('ano') ano: number, @Param('mes') mes: number) {
    const inicio_periodo: Date = new Date(ano, mes - 1, 1);
    const fim_periodo: Date = new Date(ano, mes, 0);

    const receitas = this.receitaService.getReceitasByData(
      inicio_periodo,
      fim_periodo,
    );

    return receitas;
  }

  @Get()
  async findByDescricao(@Query('descricao') descricao: string) {
    const despesa = this.receitaService.findByDescricao(
      descricao.toLocaleLowerCase(),
    );

    return despesa;
  }

  @Post()
  async InsertReceita(@Body() receita: CreateReceitaDto): Promise<Receitas> {
    receita.descricao = receita.descricao.toLowerCase();
    const [dia, mes, ano] = String(receita.data).split('/');

    const anoFixed = ano.length < 4 ? `20${ano}` : ano;

    receita.data = new Date(Number(anoFixed), Number(mes) - 1, Number(dia));

    const nova_receita = await this.receitaService.insertReceita(receita);

    return nova_receita;
  }

  @Delete(':id')
  async removeReceita(@Param() id: IdReceitaDto) {
    return this.receitaService.removeReceita(id).catch((error) => {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'algo inesperado aconteceu',
          message: error.detail,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }
}
