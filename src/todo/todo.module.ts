import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TododbController } from './todo.db.controller';
import { TododbService } from './todo.db.service';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController, TododbController],
  providers: [TododbService],
})
export class TodoModule { }