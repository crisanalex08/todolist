import { Component } from '@angular/core';
import { TodoTask } from 'src/app/Interfaces/todoTask';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {

  tasks: TodoTask[] = [];
  constructor(private tasksService: TasksService) { }
  
  ngOnInit(): void {
    console.log('ngOnInit - inbox');
    this.tasksService.getTasks(5).subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  openNewTaskDialog(): void {
    console.log('open new task dialog');
  }
}
