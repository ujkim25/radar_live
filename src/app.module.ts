import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsController } from './handlebars/handlebars.controller';
import { HandlebarsService } from './handlebars/handlebars.service';

@Module({
  imports: [],
  controllers: [AppController, HandlebarsController],
  providers: [AppService, HandlebarsService],
})
export class AppModule {}
