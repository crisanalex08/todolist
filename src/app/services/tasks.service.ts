import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../Interfaces/todoTask';
import { TodoTaskCreate } from '../Interfaces/todoTask';
import { Guid } from '../utils/Guid';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskStatus } from '../Interfaces/task-status';

export const dev = false; //to be deleted
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  userId: any;
  taskList: TodoTask[] = [];
  readonly taskSubject = new BehaviorSubject<TodoTask[]>(this.taskList);

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('userId');
  }

  getTasks(take: number) {
    return this.http.get<TodoTask[]>(
      `https://localhost:7260/api/Tasks/${localStorage.getItem(
        'userId'
      )}/${take}`
    );
  }

  getMockTasks(take: number) {
    var tasks: TodoTask[] = [];
    var mockTasks = [
      {
        Id: 'e8a3b3f2-7b73-4f51-87db-6455b9f82e3f',
        Title: 'Task 1',
        Description: 'Description for Task 1',
        CreatedDate: '2023-11-01T09:00:00Z',
        UpdatedDate: '2023-11-01T09:30:00Z',
        DueDate: '2023-11-10T15:00:00Z',
        Status: 'Pending',
        Priority: 1,
        IsDeleted: false,
        UserId: 'a25e2f3d-4c54-487d-b152-7e5a6c5a0e35',
      },
      {
        Id: 'e8a3b3f2-7b73-4f51-87db-6455b9f92e3f',
        Title: 'Task 2',
        Description: 'Description for Task 2',
        CreatedDate: '2023-11-02T10:00:00Z',
        UpdatedDate: '2023-11-02T11:15:00Z',
        DueDate: '2023-11-12T14:30:00Z',
        Status: 'InProgress',
        Priority: 2,
        IsDeleted: false,
        UserId: 'b3d9a9c0-91f7-4e2c-8d97-64b5f1f586aa',
      },
      {
        Id: '86fcd18a-53a7-46aa-b8f7-d4d20a13b5d3',
        Title: 'Task 3',
        Description: 'Description for Task 3',
        CreatedDate: '2023-11-03T11:30:00Z',
        UpdatedDate: '2023-11-03T13:45:00Z',
        DueDate: '2023-11-15T12:15:00Z',
        Status: 'Completed',
        Priority: 3,
        IsDeleted: false,
        UserId: 'c7e7b8d6-02c1-43e4-9c51-ec9d0c166a78',
      },
      {
        Id: 'f219c89a-e3d7-44b0-9e8b-d6eab0e53c62',
        Title: 'Task 4',
        Description: 'Description for Task 4',
        CreatedDate: '2023-11-04T08:45:00Z',
        UpdatedDate: '2023-11-04T10:30:00Z',
        DueDate: '2023-11-14T16:45:00Z',
        Status: 'Pending',
        Priority: 1,
        IsDeleted: true,
        UserId: 'd067baf3-53c4-49a8-85b2-6fb7a0e61dca',
      },
      {
        Id: 'b0f98a19-3e45-4a60-837f-34b3f6d8cf2a',
        Title: 'Task 5',
        Description: 'Description for Task 5',
        CreatedDate: '2023-11-05T14:15:00Z',
        UpdatedDate: '2023-11-05T16:00:00Z',
        DueDate: '2023-11-13T10:30:00Z',
        Status: 'InProgress',
        Priority: 2,
        IsDeleted: false,
        UserId: 'e886cec4-3e41-4dd2-97c4-570e8394a315',
      },
      {
        Id: 'f6c1b29e-9bb1-4d31-b99d-f65e4ef0e091',
        Title: 'Task 6',
        Description: 'Description for Task 6',
        CreatedDate: '2023-11-06T12:30:00Z',
        UpdatedDate: '2023-11-06T14:15:00Z',
        DueDate: '2023-11-11T11:00:00Z',
        Status: 'Completed',
        Priority: 3,
        IsDeleted: false,
        UserId: 'f7dca3c1-12a8-48b0-8f83-8c9eae81e9ca',
      },
      {
        Id: '8b03ad64-86f4-40cd-b7d9-4b59cb886b5d',
        Title: 'Task 7',
        Description: 'Description for Task 7',
        CreatedDate: '2023-11-07T16:00:00Z',
        UpdatedDate: '2023-11-07T17:45:00Z',
        DueDate: '2023-11-16T09:30:00Z',
        Status: 'InProgress',
        Priority: 2,
        IsDeleted: true,
        UserId: 'cf8c70a6-155a-46ef-85ea-17c1fba3b87f',
      },
      {
        Id: '38a51f64-43df-4b6a-8954-12aa7f4d25d3',
        Title: 'Task 8',
        Description: 'Description for Task 8',
        CreatedDate: '2023-08-08T10:15:00Z',
        UpdatedDate: '2023-11-08T11:30:00Z',
        DueDate: '2023-11-17T14:00:00Z',
        Status: 'Completed',
        Priority: 3,
        IsDeleted: false,
        UserId: '40aa4dbd-3b61-45c2-9d7e-933b928eac2b',
      },
      {
        Id: 'e8a3b3f2-7b73-4fq1-87db-6455b9f82e3e',
        Title: 'Task 9',
        Description: 'Description for Task 9',
        CreatedDate: '2023-11-09T13:30:00Z',
        UpdatedDate: '2023-11-09T14:45:00Z',
        DueDate: '2023-11-18T15:15:00Z',
        Status: 'Pending',
        Priority: 1,
        IsDeleted: false,
        UserId: 'a59b3cf7-97c1-41db-aa0d-34d79c367d9b',
      },
      {
        Id: 'a9d1a746-58f5-4696-8f23-5e8aa0d24d2e',
        Title: 'Task 10',
        Description: 'Description for Task 10',
        CreatedDate: '2023-11-10T15:45:00Z',
        UpdatedDate: '2023-11-10T16:30:00Z',
        DueDate: '2023-11-19T13:45:00Z',
        Status: 'Completed',
        Priority: 2,
        IsDeleted: false,
        UserId: 'e7aa78c8-6e24-4f5a-85a0-75f3d9a70edc',
      },
    ];

    mockTasks.forEach((task) => {
      tasks.push({
        id: task.Id,
        title: task.Title,
        description: task.Description,
        createdDate: new Date(),
        updatedDate: new Date(),
        dueDate: new Date(),
        status: this.getTaskStatus(task.Status),
        priority: task.Priority,
        isDeleted: task.IsDeleted,
        userId: task.UserId,
      });
    });

    return tasks;
  }

  getTaskStatus(status: string): TaskStatus {
    return status === 'Pending'
      ? TaskStatus.InProgress
      : status === 'InProgress'
      ? TaskStatus.InProgress
      : TaskStatus.Done;
  }

  getTask(id: string) {
    return this.http.get(`https://localhost:5400/tasks/${id}`);
  }

  addTask(title: string, description: string, dueDate: Date, priority: any) {
    const task = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority.value,
      userId: localStorage.getItem('userId'),
    };
    const taskData = JSON.stringify(task);
    const url = `https://localhost:7260/api/Tasks/add_task`;

    return this.http.post(url, task, {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    });
  }

  updateTask(
    id: string,
    title: string | null,
    description: string | null,
    createdDate: Date | null,
    updatedDate: Date | null,
    dueDate: Date | null,
    priority: any | null,
    status: TaskStatus | null,
    isDeleted: boolean | null
  ) {
    const task = {
      id: id,
      title: title,
      description: description,
      createdDate: createdDate,
      updatedDate: updatedDate,
      dueDate: dueDate,
      priority: priority === null ? priority : priority.value,
      status: status,
      isDeleted: isDeleted,
      userId: localStorage.getItem('userId'),
    };

    const taskData = JSON.stringify(task);
    const url = `https://localhost:7260/api/Tasks/edit_task`;
    return this.http.put(url, task, {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    });
  }

  deleteTask(id: string) {
    this.taskList = this.taskList.filter((task) => task.id !== id);

    return this.http
      .delete(`https://localhost:7260/api/Tasks/delete_task/${id}`)
      .subscribe(() => {
        this.taskList.splice(
          this.taskList.findIndex((task) => task.id === id),
          0
        );
        console.log('task deleted');
      });
  }

  toggleTaskComplete(id: string) {
    return this.updateTask(id, null, null, null, new Date(), null, null, 2, false);  //status 2 = done
  }
}
