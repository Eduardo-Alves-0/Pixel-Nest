import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Jogo } from '../../jogo/entities/jogo.entity';

@Entity({ name: 'tb_plataforma' })
export class Plataforma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Jogo, (jogo) => jogo.plataforma, {
    onDelete: 'DEFAULT',
  })
  jogo: Jogo;
}
