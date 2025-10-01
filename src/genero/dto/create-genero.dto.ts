import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGeneroDto {
  // Nome do genero
  @IsString({ message: 'O nome do genero deve ser uma string' })
  @MinLength(3, { message: 'O nome não pode conter menos de 3 caracteres' })
  @MaxLength(255, {
    message: 'O nome do genero não pode conter mais de 255 caracteres',
  })
  nome: string;

  // Descrição do genero
  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(25, { message: 'A descrição não pode ter menos de 25 caracteres' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais de 100 caracteres',
  })
  descricao: string;
}
