import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
    // message: define a mensagem de erro personalizada que será retornada se a validação falhar.
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
    // message: define a mensagem de erro personalizada que será retornada se a validação falhar.
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'A senha deve conter pelo menos um número',
    // message: define a mensagem de erro personalizada que será retornada se a validação falhar.
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)',
    // message: define a mensagem de erro personalizada que será retornada se a validação falhar.
  })
  @Column({ length: 255, nullable: false })
  senha: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @Type(() => Date) // transforma string em Date automaticamente
  @IsDate({ message: 'Data inválida, use o formato YYYY-MM-DD' }) // Verifica se o valor é realmente uma data (objeto Date válido do JavaScript).
  dataNascimento: Date;
}
