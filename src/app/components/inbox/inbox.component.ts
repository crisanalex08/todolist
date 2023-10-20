import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoTask } from 'src/app/Interfaces/todoTask';
import { TasksService } from 'src/app/services/tasks.service';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  tasks: TodoTask[] = [];
  constructor(private dialog: MatDialog, private tasksService: TasksService) {}

  ngOnInit(): void {
    console.log('ngOnInit - inbox');
    this.tasksService.getTasks(2).subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  openNewTaskDialog(): void {
    var title: string = '';
    var description: string = '';
    var dueDate: Date = new Date();
    var priority: number = 1;
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.tasksService
          .addTask(
            result.title,
            result.description,
            result.dueDate,
            result.priority
          )
          .subscribe((task : any) => {
            this.tasks.push(task);
          });
      }
    });
  }
}
