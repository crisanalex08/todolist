import { TaskStatus } from "./task-status";

export interface TodoTask {
    id: number;
    title: string;
    description: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    DueDate: Date;
    status: TaskStatus;
    priority: number;
    isDeleted: boolean;
}