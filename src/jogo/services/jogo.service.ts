import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { CreateJogosDto } from './../dto/create-jogo.dto';
import { Jogo } from './../entities/jogo.entity';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private jogoRepository: Repository<Jogo>,
  ) {}

  async findAll(): Promise<Jogo[]> {
    return await this.jogoRepository.find();
  }

  async findById(id: number): Promise<Jogo> {
    const jogo = await this.jogoRepository.findOne({
      where: {
        id,
      },
    });
    if (!jogo) {
      throw new HttpException('Jogo não encontrado', HttpStatus.NOT_FOUND);
    }
    return jogo;
  }

  async findByName(nome: string): Promise<Jogo[]> {
    const jogo = await this.jogoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
    return jogo;
  }

  async findAllLancamentoDate(dataLancamento: Date): Promise<Jogo[]> {
    const jogo = await this.jogoRepository.find({
      where: {
        dataLancamento,
      },
    });
    if (!jogo) {
      throw new HttpException('Não tem jogo lançado', HttpStatus.NOT_FOUND);
    }
    return jogo;
  }

  async findAllClassificacao(classificacao: number): Promise<Jogo[]> {
    const jogos = await this.jogoRepository.find({
      where: { classificacao },
    });

    if (jogos.length === 0) {
      throw new HttpException(
        'Nenhum jogo encontrado com essa classificação',
        HttpStatus.NOT_FOUND,
      );
    }

    return jogos;
  }

  async create(createJogosDto: CreateJogosDto): Promise<Jogo> {
    return await this.jogoRepository.save(createJogosDto);
  }

  async update(jogo: Jogo): Promise<Jogo> {
    await this.findById(jogo.id);

    return await this.jogoRepository.save(jogo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.jogoRepository.delete(id);
  }
}
