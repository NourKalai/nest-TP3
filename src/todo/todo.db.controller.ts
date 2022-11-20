import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    Delete,
    Param,
    Put,
    Query,
    UsePipes,
    Version,
  } from '@nestjs/common/decorators';

  import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { AddTodoDto } from './dto/create-todo.dto';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TododbService } from './todo.db.service';
  @Controller('tododb-controller')
  export class TododbController {
    private todos: Todo[] = [];
    constructor(private todoService: TododbService) {}
  
    @Get()
    getTodos(): Todo[] {
      return this.todoService.getTodos();
    }
    @Post('add')
    @UsePipes(ValidationPipe)
    setTodos(@Body() createDTO: AddTodoDto) {
      return this.todoService.setTodos(createDTO);
    }
    @Get('ById/:id')
    findbyId(@Param('id', ParseIntPipe) id: number): Todo {
      return this.findtodo(id);
    }
    @Delete('delete/:id')
    deleteTodo(@Param('id', ParseIntPipe) id: number): string {
      return this.todoService.deleteTodo(id);
    }
    @Put('modify/:id')
    @UsePipes(ValidationPipe)
    modifybyId(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTodoDto: UpdatetodoDto,
    ): Todo {
      return this.todoService.modifybyId(id, updateTodoDto);
    }
  
    findtodo(@Param('id', ParseIntPipe) id: number): Todo {
      const todo1 = this.todos.find((todo) => todo.id == id);
      if (!todo1) throw new NotFoundException();
      return todo1;
    }
    @Post('addBD')
    async addTodoBD(@Body() todo: AddTodoDto): Promise<Todo> {
      return this.todoService.addTodoBD(todo);
    }
  
    @Put('updateBD/:id')
    async updateTodoBD(
      @Body() todo:  UpdatetodoDto,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Todo> {
      {
        return this.todoService.updateTodoBD(id, todo);
      }
    }
    @Delete('DeletefromBD/:id')
    async softRemovefromBD(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Todo> {
      {
        return this.todoService.softRemovefromBD(id);
      }
    }
    @Get('recover/:id')
    async RecoverTodo(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Todo> {
      {
        return this.todoService.RecoverTodo(id);
      }
    }
  
    @Get('allTodos')
    async AllTodos() {
      {
        return this.todoService.getTodosAll();
      }
    }
    @Get('TodowithId/:id')
    async findtodowithId(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Todo[]> {
      {
        return await this.todoService.getTodowithId(id);
      }
    }
  }