import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateJogosDto {
  // Nome do jogo - obrigatório, string de até 255 caracteres
  @IsString({ message: 'O nome do jogo deve ser uma string' })
  @MaxLength(255, {
    message: 'O nome do jogo não pode ter mais que 255 caracteres',
  })
  nome: string;

  // Descrição detalhada do jogo - obrigatório, string de até 2000 caracteres
  @IsString({ message: 'A descrição do jogo deve ser uma string' })
  @MaxLength(2000, {
    message: 'A descrição não pode ter mais que 2000 caracteres',
  })
  descricao: string;

  // Preço do jogo - obrigatório, número decimal
  @IsNumber({}, { message: 'O preço do jogo deve ser um número' })
  preco: number;

  // Nome da empresa desenvolvedora - obrigatório, string de até 255 caracteres
  @IsString({ message: 'A empresa desenvolvedora deve ser uma string' })
  @MaxLength(255, {
    message:
      'O nome da empresa desenvolvedora não pode ter mais que 255 caracteres',
  })
  empresaDesenvolvedora: string;

  // Nome da publicadora - obrigatório, string de até 255 caracteres
  @IsString({ message: 'A publicadora deve ser uma string' })
  @MaxLength(255, {
    message: 'O nome da publicadora não pode ter mais que 255 caracteres',
  })
  publicadora: string;

  // Data de lançamento do jogo - obrigatório, deve ser uma data válida
  @IsDate({ message: 'A data de lançamento deve ser uma data válida' })
  dataLancamento: Date;

  // Classificação indicativa do jogo (ex: 10, 12, 18) - obrigatório, número
  @IsNumber({}, { message: 'A classificação indicativa deve ser um número' })
  classificacaoIndicada: number;

  // URL do trailer do jogo - obrigatório, string de até 5000 caracteres
  @IsString({ message: 'A URL do trailer deve ser uma string' })
  @MaxLength(5000, {
    message: 'A URL do trailer não pode ter mais que 5000 caracteres',
  })
  urlTrailer: string;

  // Indica se o jogo está ativo (disponível) - obrigatório, booleano
  @IsBoolean({ message: 'O campo jogosAtivos deve ser verdadeiro ou falso' })
  jogosAtivos: boolean;

  // Quantidade de unidades em estoque - obrigatório, número inteiro, mínimo 0
  @IsNumber({}, { message: 'O estoque deve ser um número' })
  @Min(0, { message: 'O estoque não pode ser negativo' })
  estoque: number;
}
