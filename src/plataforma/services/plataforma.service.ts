import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { CreatePlataformaDto } from '../dto/create-plataforma';
import { UpdatePlataformaDto } from '../dto/update-plataforma';
import { Plataforma } from './../entities/plataforma.entity';

@Injectable()
export class PlataformaService {
  constructor(
    @InjectRepository(Plataforma)
    private plataformaRepository: Repository<Plataforma>,
  ) {}

  async findAll(): Promise<Plataforma[]> {
    return await this.plataformaRepository.find();
  }

  async findById(id: number): Promise<Plataforma> {
    const genero = await this.plataformaRepository.findOne({
      where: {
        id,
      },
    });
    if (!genero) {
      throw new HttpException('ID não encontado', HttpStatus.NOT_FOUND);
    }
    return genero;
  }

  async findByNome(nome: string): Promise<Plataforma[]> {
    const genero = await this.plataformaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
    if (!genero) {
      throw new HttpException('Nome não encontrado', HttpStatus.NOT_FOUND);
    }
    return genero;
  }

  async create(createPlataformaDto: CreatePlataformaDto): Promise<Plataforma> {
    return await this.plataformaRepository.save(createPlataformaDto);
  }

  async update(
    id: number,
    updatePlataforma: UpdatePlataformaDto,
  ): Promise<Plataforma> {
    const jogo = await this.findById(id);

    Object.assign(jogo, updatePlataforma);
    return this.plataformaRepository.save(jogo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.plataformaRepository.delete(id);
  }
}
