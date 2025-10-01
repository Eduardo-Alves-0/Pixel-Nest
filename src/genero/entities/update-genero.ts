import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneroDto } from '../dto/create-genero.dto';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}
