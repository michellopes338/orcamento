import { Categoria } from '../../categorias/entities/categoria.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  ManyToOne,
} from 'typeorm';

@Entity()
@Unique('uma_despesa_por_mes', ['descricao', 'mes'])
export class Despesa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  descricao: string;

  @Column('decimal', { precision: 7, scale: 2 })
  valor: number;

  @Column()
  mes: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  categoria: Categoria;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
