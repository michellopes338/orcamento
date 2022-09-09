import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receitas } from './receitas/entities/receita.entity';
import { ReceitaModule } from './receitas/receitas.module';
import { DespesasModule } from './despesas/despesas.module';
import { Despesa } from './despesas/entities/despesa.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'orcamento',
      entities: [Receitas, Despesa, User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ReceitaModule,
    DespesasModule,
    CategoriasModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
