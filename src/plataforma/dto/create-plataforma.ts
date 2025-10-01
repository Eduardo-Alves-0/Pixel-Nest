import { IsString, MaxLength } from 'class-validator';

export class CreatePlataformaDto {
  @IsString({ message: 'O nome da plataforma deve ser uma string' })
  @MaxLength(255, {
    message: 'O nome da plataforma não pode ter mais que 255 caracteres',
  })
  nome: string;
}
