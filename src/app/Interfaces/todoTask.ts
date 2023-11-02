import { TaskStatus } from "./task-status";

export interface TodoTask {
    id: string;
    title: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
    dueDate: Date;
    status: TaskStatus;
    priority: number;
    isDeleted: boolean;
    userId: string | null;
}

export class TodoTaskCreate implements TodoTask{
    id: string = '';
    title: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
    dueDate: Date;
    status: TaskStatus;
    priority: number;
    isDeleted: boolean;
    userId: string | null;

    constructor(title: string, description: string, CreatedDate: Date, UpdatedDate: Date, DueDate: Date, status: TaskStatus, priority: number, isDeleted: boolean, userId: string | null){
        this.title = title;
        this.description = description;
        this.createdDate = CreatedDate;
        this.updatedDate = UpdatedDate;
        this.dueDate = DueDate;
        this.status = status;
        this.priority = priority;
        this.isDeleted = isDeleted;
        this.userId = userId;
    }
}