import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../Interfaces/todoTask';
import { TodoTaskCreate } from '../Interfaces/todoTask';
import { Guid } from '../utils/Guid';
import { BehaviorSubject, Observable } from 'rxjs';

export const dev = true; //to be deleted
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  userId: any;
  taskList: TodoTask[] = [];
  readonly taskSubject = new BehaviorSubject<TodoTask[]>(this.taskList);

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('userId');
  }

  getTasks(take: number) {
      return this.http.get<TodoTask[]>(`https://localhost:5400/task/${this.userId}/${take}`);
  }

  getMockTasks(take:number):TodoTask[]{
    var task;
    var tasks: TodoTask[] = [];
    for(let i = 0; i < take; i++){
      task = {
        id: Guid.newGuid(),
        title: `title${i}`,
        description: `description${i}`,
        CreatedDate: new Date(),
        UpdatedDate: new Date(),
        DueDate: new Date(2023,10,21,20,10,2,2),
        status: 0,
        priority: i % 3,
        isDeleted: false,
        userId: this.userId
      };
      tasks.push(task);
    }
    return tasks;
  }

  getTask(id: string) {
    return this.http.get(`https://localhost:5400/tasks/${id}`);
  }

  addTask(title: string, description: string, dueDate: Date, priority: number) {
    const task = {
      id: Guid.newGuid(),
      title: title,
      description: description,
      createdDate: new Date(),
      updatedDate: new Date(),
      dueDate: dueDate,
      status: 0,
      priority: priority,
      isDeleted: true,
      userId: this.userId
    };
    const taskData = JSON.stringify(task);
    const url = `https://localhost:5400/task/add_task/${this.userId}`;

    return this.http.post(url,
      task
      , {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
  }

  deleteTask(id: string) {
    return this.http.delete(`https://localhost:5400/task/delete/${id}`);
  }
}
