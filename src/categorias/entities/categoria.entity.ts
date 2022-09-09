import { Despesa } from '../../despesas/entities/despesa.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Despesa, (despesa) => despesa.id)
  despesa: Despesa[];

  @Column({ unique: true })
  label: string;
}
