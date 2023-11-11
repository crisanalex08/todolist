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
done: boolean = false;
ngOnInit(): void {
  this.checkTask();
  if(this.task.status == 2){
    this.done = true;
  }
}

constructor(private taskService: TasksService) { }

checkTask(): void {
}

  deleteTask(): void {
    console.log('delete task');
    this.taskService.deleteTask(this.task.id);
  }

  editTask(): void {
    console.log('edit task');
  }

  toggleTaskComplete(): void {
    console.log('toggle task complete');
    this.taskService.toggleTaskComplete(this.task.id).subscribe((task: any) => {
      this.taskService.getTasks(0).subscribe((tasks: any) => {
        this.taskService.taskList = tasks;
      });
      console.log("task status: " + this.task.status);
      if(this.task.status == 2){
        this.done = true;
      }
    });
  }

  
}
