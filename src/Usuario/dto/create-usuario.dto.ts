import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  // Nome do usuário
  @IsString()
  @MinLength(3, { message: 'O nome não pode ter menos de 3 caracteres' })
  @MaxLength(255, { message: 'O nome não pode passar de 255 caracteres' })
  nome: string;

  // Email do usuário
  @IsString()
  @IsNotEmpty({ message: 'O email não pode estar vazio' })
  @MinLength(10, { message: 'O email não pode ter menos de 10 caracteres' })
  @Matches(/^[^\s@]+/, {
    message: 'O email deve começar com caracteres válidos',
  })
  @Matches(/@/, { message: 'O email deve conter o @' })
  @Matches(/\.[^\s@]+$/, {
    message: 'O email deve terminar com um domínio válido',
  })
  email: string;

  // Senha do usuário
  @IsString()
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
  senha: string;

  // Data de nascimento
  @IsDateString()
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  dataNascimento: Date;
}
