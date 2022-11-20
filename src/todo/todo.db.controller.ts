import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { AddTodoDto } from './dto/create-todo.dto';
import { TododbService } from './todo.db.service';


@Controller({ path: 'todo', version: '2' })
export class TododbController {
    constructor(private todoService: TododbService) { }
    // @Get()
    // getTodos() {}

    @Post()
    async createTodo(@Body() todoCreate: AddTodoDto) {
        return await this.todoService.addTodo(todoCreate);
    }

    // @Get('/:id')
    // getTodoById(@Param('id') id: string) {}

    // @Delete('/:id')
    // deleteTodoById(@Param() params) {}

    // @Put('/:id')
    // updateTodoById(@Param() params, @Body() todoUpdate: UpdatetodoDto) {}
}