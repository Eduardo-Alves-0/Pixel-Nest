import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Genero } from '../entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private generoRepository: Repository<Genero>,
  ) {}

  async findAll(): Promise<Genero[]> {
    return await this.generoRepository.find();
  }

  async findById(id: number): Promise<Genero> {
    const genero = await this.generoRepository.findOne({
      where: {
        id,
      },
    });
    if (!genero) {
      throw new HttpException('Id não encontrado', HttpStatus.NOT_FOUND);
    }
    return genero;
  }

  async findByName(nome: string): Promise<Genero[]> {
    const genero = await this.generoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
    return genero;
  }
}
