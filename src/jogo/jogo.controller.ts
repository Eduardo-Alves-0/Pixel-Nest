import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogoService } from './jogo.service';

@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Post()
  create(@Body() createJogoDto: CreateJogoDto) {
    return this.jogoService.create(createJogoDto);
  }

  @Get()
  findAll() {
    return this.jogoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jogoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJogoDto: UpdateJogoDto) {
    return this.jogoService.update(+id, updateJogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogoService.remove(+id);
  }
}
