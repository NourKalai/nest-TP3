import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../models/todostatus';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;


  @Column()
  status: TodoStatusEnum ;



}