import { Controller, Get, Post, Delete, Put, Patch, Param, Body, Version, ParseIntPipe } from '@nestjs/common';
import { AddTodoDto } from './dto/create-todo.dto';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusEnum } from './models/todostatus';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(
    private TodoService: TodoService
  ) {

  }


  private todos = [];





  // @Version('2')
  @Post()
  async AddTodo(
    @Body() addTodoDto: AddTodoDto
  ): Promise<Todo> {
    return await this.TodoService.addTodo(addTodoDto);
  }


  @Patch(':id')
  async updateTodo(
    @Body() updatetodoDto: UpdatetodoDto,
    @Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.TodoService.updateTodo(id, updatetodoDto);
  }
  //delete
  /* @Delete(':id')
       async deletetodo(@Param('id',ParseIntPipe) id:number){
           return this.TodoService.deleteTodo(id);
       }*/


  //count by status
  @Get('count')
  async nombretodobystatus() {
    return await this.TodoService.todoByStatus();
  }



  //@Version('1')
  //find by status
  @Get(':status')
  getBystatus(@Param('status') status: TodoStatusEnum) {
    return this.TodoService.getTodoByCriteria(status);
  }
  //get all the todos
  @Get('recupere')
  async getTodo(): Promise<Todo[]> {
    return await this.TodoService.getTodo();
  }

  //get todo by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {

    return this.TodoService.getTodobyId(id);
  }


  //softdelete
  @Delete(':id')
  async deletetodo(@Param('id', ParseIntPipe) id: number) {
    return this.TodoService.softDelete(id);
  }
  //restaurer le todo avec son id 
  @Get('restore/:id')
  async restoretodo(@Param('id', ParseIntPipe) id: number) {
    return await this.TodoService.restoretodo(id);
  }
  //      //@Version('2')
  //     /*@Get()
  //     getTodos2(){

  //         return this.todos;
  //     }*/




  //   //  @Version('1')
  //    /*@Post()
  //     AdTodo(@Body() AddTodoDto:AddTodoDto ){
  //         const todo= new todoModel()
  //         todo.name=AddTodoDto.name;
  //         todo.description=AddTodoDto.description;
  //         this.todos.push(todo)
  //         return todo;
  //     }*/



  //     //find to do by id
  //     /*@Get('/:id')
  //     gettodobyid(@Param('id') id)
  //     {
  //         return this.todos.find((todoitem)=>todoitem.id==id)
  //     }
  // */

  //     // delete by id
  //    /*@Delete (':id')
  //    deletetodobyid(@Param('id') id)
  //    {
  //   this.todos=this.todos.filter(thistodo=>thistodo.id !== id)
  //    return 'todo item deleted'
  //    }*/


  //   // update 
  //    /*@Put(':id')
  //     update(@Param('id') id : number ,@Body ('todo') todoupdate: UpdatetodoDto)
  //     {
  //         const TODO= this.todos.find((todoitem)=>todoitem.id==id);
  //         if(TODO){
  //             Object.assign(UpdatetodoDto,TODO);
  //             this.todos.push(TODO);
  //         }
  //         return this.todos;

  //     }*/




  //    }






}