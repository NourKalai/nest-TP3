import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AddTodoDto } from './dto/create-todo.dto';
import { UpdatetodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoStatusEnum } from './models/todostatus';


@Injectable()
export class TodoService{
    constructor(
        @InjectRepository(Todo)
        private TodoRepository: Repository<Todo>,
      ) {}

     

//get a todo
      async getTodo():Promise<Todo[]>{
        return await this.TodoRepository.find();
      }
//get todo by id 
      async getTodobyId(id:number):Promise<Todo[]>{
        return await this.TodoRepository.findByIds([id]);
      }
 //get a todo where  le name ou description contiennent la chaine passée en paramètre et ayant le statut passé en paramètre.     
        async getTodoByCriteria(status:TodoStatusEnum){
          const stat=this.TodoRepository.createQueryBuilder('todo');
          stat.select('todo.id,todo.status,todo.name,todo.description')
          .where(
            "todo.status = :status", {status: status}
          )
         
          return await stat.getRawMany();
        }
        
// add a todo
      async addTodo(todo:AddTodoDto):Promise<Todo>{
        return await this.TodoRepository.save(todo);
      }
//update todo with id
      async updateTodo(id:number,todo:UpdatetodoDto):Promise<Todo>{
         const newTodo=await this.TodoRepository.preload({
           id,
           ...todo
         });
         if(!newTodo)
         {throw new NotFoundException('ce todo est inexistant')}
        return await this.TodoRepository.save(newTodo);
      }
//delete todo with id
      async deleteTodo(id:number){
   
        return await this.TodoRepository.delete(id) ;
      }

//soft delete 
      async softDelete(id:number){
        return this.TodoRepository.softDelete(id);
      }    

      async restoretodo(id:number){
        this.TodoRepository.restore(id);
      }
//count by status
async todoByStatus(){
  const stat=this.TodoRepository.createQueryBuilder('todo');
  stat.select('todo.status,count(todo.id)')
  .groupBy('todo.status');
  console.log(stat.getSql());
  return await stat.getRawMany();
}
}