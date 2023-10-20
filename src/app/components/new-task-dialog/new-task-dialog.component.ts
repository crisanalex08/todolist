import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
})
export class NewTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  priorities: { value: number; viewValue: string }[] = [
    {
      value: 1,
      viewValue: 'Low',
    },
    {
      value: 2,
      viewValue: 'Medium',
    },
    {
      value: 3,
      viewValue: 'High',
    },
    {
      value: 4,
      viewValue: 'Urgent',
    },
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  description: string;
  dueDate: Date;
  priority: number;
}
