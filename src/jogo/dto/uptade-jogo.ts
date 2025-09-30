import { PartialType } from '@nestjs/mapped-types';
import { CreateJogosDto } from './create-jogo.dto';

export class UpdateJogosDto extends PartialType(CreateJogosDto) {}
// PartialType - usado para chamar apenas uma seção da Create (apenas quando for chamado)
