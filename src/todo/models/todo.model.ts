import { v4 as uuidv4 } from 'uuid';
import { TodoStatusEnum } from './todostatus';

export class TodoModel {
    id: string;
    dateCreation: Date;

    constructor(
        public name: string,
        public description: string,
        public status: TodoStatusEnum = TodoStatusEnum.waiting
    ) {
        this.id = uuidv4().split('-')[0];
        this.dateCreation = new Date();
    }
}