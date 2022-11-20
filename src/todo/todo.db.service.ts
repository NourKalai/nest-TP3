
import { AddTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Body, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { UpdatetodoDto } from './dto/update-todo.dto';

@Injectable()
export class TododbService {
    private todos: Todo[] = [];
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) { }

    async addTodo(todoCreate: AddTodoDto) {
        const todo = new Todo();
        todo.name = todoCreate.name;
        todo.description = todoCreate.description;
        return await this.todoRepository.save(todo);
    }



    findtodo(@Param('id', ParseIntPipe) id: number): Todo {
        const todo1 = this.todos.find((todo) => todo.id == id);
        if (!todo1) throw new NotFoundException();
        return todo1;
    }
    getTodos(): Todo[] {
        return this.todos;
    }
    setTodos(@Body() createDTO: AddTodoDto): Todo {
        const todo = new Todo();
        todo.name = createDTO.name;
        todo.description = createDTO.description;
        this.todos.push(todo);
        return todo;
    }
    findbyId(@Param('id', ParseIntPipe) id: number): Todo {
        return this.findtodo(id);
    }
    deleteTodo(@Param('id', ParseIntPipe) id: number): string {
        const todo = this.findtodo(+id);
        this.todos = this.todos.filter((todo) => todo.id != id);
        return 'todo deleted successfully';
    }
    modifybyId(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdatetodoDto,
    ): Todo {
        const todo = this.findtodo(id);
        if (todo) {
            Object.assign(updateTodoDto, todo);
            this.todos.push(todo);
        }
        return todo;
    }

    async addTodoBD(todo: AddTodoDto): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }
    async updateTodoBD(id: number, todo: UpdatetodoDto): Promise<Todo> {
        const newTodo = await this.todoRepository.preload({ id, ...todo });
        return await this.todoRepository.save(newTodo);
    }
    async RemovefromBD(id: number): Promise<Todo> {
        const entitytoremove = await this.todoRepository.findOneById(id);
        if (!entitytoremove) {
            throw new NotFoundException("todo d'id  ${id} n'existe pas ");
        }
        return await this.todoRepository.remove(entitytoremove);
    }
    async softRemovefromBD(id: number): Promise<Todo> {
        const entitytoremove = await this.todoRepository.findOneById(id);
        if (!entitytoremove) {
            throw new NotFoundException("l'element de cet id n'existe pas ");
        }
        return await this.todoRepository.softRemove(entitytoremove);
    }
    async RecoverTodo(id: number): Promise<Todo> {
        const entitytorestore = await this.todoRepository.findOneById(id);

        return await this.todoRepository.recover(entitytorestore);
    }

    async getTodosAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async getTodowithId(id: number): Promise<Todo[]> {
        return await this.todoRepository.findBy({ id: id });
    }


}
