import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoTask } from 'src/app/Interfaces/todoTask';
import { TasksService, dev } from 'src/app/services/tasks.service';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  tasks: TodoTask[] = [];
  constructor(private dialog: MatDialog, private tasksService: TasksService) { }

  ngOnInit(): void {
    if (dev) {
      this.tasksService.taskList = this.tasksService.getMockTasks(5);
    } else {
      console.log('ngOnInit - inbox');
      this.tasksService.getTasks(2).subscribe((tasks: any) => {
        this.tasksService.taskList = tasks;
        console.log(this.tasks);
      });
    }

    this.tasksService.taskSubject.next(this.tasksService.taskList);
    this.tasks = this.tasksService.taskList;
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
          .subscribe((task: any) => {
            this.tasks.push(task);
          });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
