import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_jogos')
export class Jogos {
  // ID do jogo - chave primária autoincrement
  @PrimaryGeneratedColumn()
  id: number;

  // Nome do jogo - obrigatório
  @Column({ length: 255, nullable: false })
  nome: string | number;

  // Descrição detalhada do jogo - obrigatório
  @Column({ length: 2000, nullable: false })
  descricao: string;

  // Preço do jogo - decimal com 2 casas decimais
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  // Nome da empresa que desenvolveu o jogo - obrigatório
  @Column({ length: 255, nullable: false })
  empresaDesenvolvedora: string;

  // Nome da empresa que publicou o jogo - obrigatório
  @Column({ length: 255, nullable: false })
  publicadora: string;

  // Data de lançamento do jogo
  @Column()
  dataLancamento: Date;

  // Classificação indicativa do jogo (ex: 10, 12, 18)
  @Column()
  classificacaoIndicada: number;

  // URL do trailer do jogo
  @Column({ length: 5000 })
  urlTrailer: string;

  // Indica se o jogo está ativo (disponível)
  @Column()
  jogosAtivos: boolean;

  // Quantidade de unidades em estoque
  @Column()
  estoque: number;

  // Data de criação do registro
  @Column()
  dataCriacao: Date;

  // Data da última atualização do registro
  @Column()
  ultimaAtualizacao: Date;
}
