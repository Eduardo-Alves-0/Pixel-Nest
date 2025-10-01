import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogoModule } from '../src/jogo/';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioService } from './usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db_pixelnest',
      entities: [],
      synchronize: true,
      logging: true,
    }),
    JogoModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
