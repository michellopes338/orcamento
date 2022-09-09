import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('uma_descricao_por_mes', ['descricao', 'mes_da_receita'])
export class Receitas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  descricao: string;

  @Column('decimal', { precision: 7, scale: 2 })
  valor: number;

  @Column()
  mes_da_receita: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
