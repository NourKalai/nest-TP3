import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TododbController } from './todo.db.controller';
import { TododbService } from './todo.db.service';


@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [ TododbController],
  providers: [TododbService],
})
export class TodoModuleModule {}