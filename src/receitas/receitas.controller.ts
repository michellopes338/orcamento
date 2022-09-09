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

  @Get()
  async findByDescricao(@Query('descricao') descricao: string) {
    const despesa = this.receitaService.findByDescricao(
      descricao.toLocaleLowerCase(),
    );

    return despesa;
  }

  @Post()
  async InsertReceita(@Body() receita: CreateReceitaDto): Promise<Receitas> {
    try {
      receita.descricao = receita.descricao.toLowerCase();
      const nova_receita = await this.receitaService.insertReceita(receita);

      return nova_receita;
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'receita duplicada',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
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
  }

  @Put(':id')
  async updateReceita(
    @Body() novas_infos: UpdateReceitaDto,
    @Param() id: IdReceitaDto,
  ): Promise<Receitas> {
    return this.receitaService.updateReceita(novas_infos, id).catch((error) => {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'receita duplicada',
        },
        HttpStatus.BAD_REQUEST,
      );
    });
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
