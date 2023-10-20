import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { TodoTask } from 'src/app/Interfaces/todoTask';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
@Input() task: TodoTask = {} as TodoTask;
latetask: boolean = false;
ngOnInit(): void {
  this.checkTask();
  
}

constructor(private taskService: TasksService) { }

checkTask(): void {
  var taskFlag = document.getElementById('task-flag');
  if(this.task.DueDate < new Date()){
    this.latetask = true;
    taskFlag!.style.color = 'red';
  }else{
    this.latetask = false;
    taskFlag!.style.color = 'green';
  }
}

  deleteTask(): void {
    console.log('delete task');
    this.taskService.deleteTask(this.task.id).subscribe();
  }

  editTask(): void {
    console.log('edit task');
  }
}
