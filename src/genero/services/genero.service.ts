import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Jogo } from '../../jogo/entities/jogo.entity';
import { Genero } from '../entities/genero.entity';
import { CreateGeneroDto } from './../dto/create-genero.dto';
import { UpdateGeneroDto } from './../entities/update-genero';

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

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    return await this.generoRepository.save(createGeneroDto);
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findById(id);

    Object.assign(Jogo, updateGeneroDto);
    return this.generoRepository.save(genero);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.generoRepository.delete(id);
  }
}
