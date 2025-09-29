import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_usuarios')
export class Usuario {
  // ID do usuário - autoincrement
  @PrimaryGeneratedColumn()
  id: number;

  // Nome do usuário
  @Column({ length: 255, nullable: false })
  nome: string;

  // Email do usuário
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  // Senha do usuário
  @Column({ length: 255, nullable: false })
  senha: string;

  // Data de nascimento
  @Column()
  dataNascimento: Date;
}
