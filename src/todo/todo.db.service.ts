import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TododbService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async addTodo(todoCreate: AddTodoDto) {
    const todo = new Todo();
    todo.name = todoCreate.name;
    todo.description = todoCreate.description;
    return await this.todoRepository.save(todo);
  }
}