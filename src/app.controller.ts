import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
// import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { DespesasService } from './despesas/despesas.service';
import { ReceitaService } from './receitas/receitas.service';
import { Public } from './roles/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly receitaService: ReceitaService,
    private readonly despesaService: DespesasService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request: any) {
    return this.authService.generateToken(request.user);
  }

  @Get('resumo/:ano/:mes')
  async resumo(@Param('ano') ano: number, @Param('mes') mes: number) {
    const inicio_periodo = new Date(ano, mes - 1, 1);
    const fim_periodo = new Date(ano, mes, 0);

    const total_receita = await this.receitaService.getTotalByMes(
      inicio_periodo,
      fim_periodo,
    );

    const total_despesa = await this.despesaService.getTotalByMes(
      inicio_periodo,
      fim_periodo,
    );

    const gasto_por_categoria = await this.despesaService.getTotalByCategoria(
      inicio_periodo,
      fim_periodo,
    );

    return {
      total_receita,
      total_despesa,
      saldo: Number(total_receita.total) - Number(total_despesa.total),
      gasto_por_categoria,
    };
  }
}
