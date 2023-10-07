import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../Interfaces/todoTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getTasks(take: number){
    return this.http.get<TodoTask[]>(`http://localhost:5400/task/${take}`);
  }

  getTask(id: number){
    return this.http.get(`http://localhost:5400/tasks/${id}`);
  }
}
