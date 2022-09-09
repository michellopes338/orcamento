import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('uma_descricao_por_mes', ['descricao', 'data'])
export class Receitas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  descricao: string;

  @Column('decimal', { precision: 7, scale: 2 })
  valor: number;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
