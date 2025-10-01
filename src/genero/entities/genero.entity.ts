import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Jogo } from '../../jogo/entities/jogo.entity';

@Entity({ name: 'tb_genero' })
export class Genero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  nome: string;

  @Column({ length: 1000, nullable: false })
  descricao: string;

  @OneToMany(() => Jogo, (jogo) => jogo.genero, {
    onDelete: 'DEFAULT',
  })
  jogo: Jogo;
}
