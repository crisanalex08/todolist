import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../Interfaces/todoTask';
import { TodoTaskCreate } from '../Interfaces/todoTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getTasks(take: number){
    return this.http.get<TodoTask[]>(`https://localhost:5400/task/${localStorage.getItem('userId')}/${take}`);
  }

  getTask(id: string){
    return this.http.get(`https://localhost:5400/tasks/${id}`);
  }

  addTask(title: string, description: string, dueDate: Date, priority: number){
    const task = new TodoTaskCreate(title, description, new Date(), new Date(), dueDate, 0, priority, false, localStorage.getItem('userId'));
    const taskData = JSON.stringify(task);
    const url = `https://localhost:5400/task/add_task?userId=${localStorage.getItem('userId')}`;

    return this.http.post(url, taskData, {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    });
  }

  deleteTask(id: string){
    return this.http.delete(`https://localhost:5400/task/delete?taskid=${id}`);
  }
}