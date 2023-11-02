import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoTask } from 'src/app/Interfaces/todoTask';
import { TasksService, dev } from 'src/app/services/tasks.service';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  TaskDetailsComponent,
  TaskDetailsDialogData,
} from '../task-details/task-details.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  tasks: TodoTask[] = [];
  constructor(private dialog: MatDialog, public tasksService: TasksService) {}

  ngOnInit(): void {
    if (dev) {
      this.tasksService.taskList = this.tasksService.getMockTasks(5);
    } else {
      console.log('ngOnInit - inbox');
      this.tasksService.getTasks(0).subscribe((tasks: any) => {
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
            this.tasksService.getTasks(0).subscribe((tasks: any) => {
              this.tasksService.taskList = tasks;
            });
          });
      }
    });
  }

  openTaskDetailsDialog(task: TodoTask): void {
    console.log(task);
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: {
        title: task.title,
        description: task.description,
        createdDate: task.createdDate,
        updatedDate: task.updatedDate,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        isDeleted: task.isDeleted,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskDetailsDialogData) => {
      if (result) {
        this.tasksService
          .updateTask(
            task.id,
            result.title,
            result.description,
            result.createdDate,
            result.updatedDate,
            result.dueDate,
            result.priority,
            result.status,
            result.isDeleted
          )
          .subscribe((task: any) => {
            this.tasksService.getTasks(0).subscribe((tasks: any) => {
              this.tasksService.taskList = tasks;
            });
          });
      }
      else{
        console.log('no changes made');
      }
    });
  }

  compareTasks(a: TaskDetailsDialogData, b: TodoTask): boolean {
    return (
      a.title === b.title &&
      a.description === b.description &&
      a.createdDate === b.createdDate &&
      a.updatedDate === b.updatedDate &&
      a.dueDate === b.dueDate &&
      a.priority === b.priority &&
      a.status === b.status &&
      a.isDeleted === b.isDeleted
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
