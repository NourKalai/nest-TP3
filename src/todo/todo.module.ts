import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TododbService } from './todo.db.service';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController, TodoController],
  providers: [TododbService],
})
export class TodoModule { }