import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_usuarios')
export class Usuarios {
  // ID do usuário - autoincrement
  @PrimaryGeneratedColumn()
  id: number;

  // Nome do usuário
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MinLength(3, { message: 'O nome não pode ter menos de 3 caracteres' })
  @MaxLength(255, { message: 'O nome não pode passar de 255 caracteres' })
  @Column({ length: 255, nullable: false })
  nome: string;

  // Email do usuário
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @MinLength(10, { message: 'O email não pode ter menos de 10 caracteres' })
  @Matches(/^[^\s@]+/, {
    message: 'O email deve começar com caracteres válidos',
  })
  @Matches(/@/, { message: 'O email deve conter o @' })
  @Matches(/\.[^\s@]+$/, {
    message: 'O email deve terminar com um domínio válido',
  })
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  // Senha do usuário
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'A senha deve conter pelo menos um número',
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)',
  })
  @Column({ length: 255, nullable: false })
  senha: string;

  // Data de nascimento
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @Column()
  dataNascimento: Date;
}
