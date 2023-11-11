import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Form, FormControl } from '@angular/forms';
import { TaskStatus } from 'src/app/Interfaces/task-status';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  public tempTask: TaskDetailsDialogData;
  public descriptionEdit: boolean = false;
  public priorityEdit: boolean = false;
  public dueDateEdit: boolean = false;
  public statusEdit: boolean = false;
  public date: FormControl = new FormControl(new Date(this.data.dueDate));
  public selectedStatus;

  ngOnInit(): void {
    console.log(this.tempTask.status);
  }
  public statuses: { value: number; viewValue: string }[];
  
  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tempTask = data;
    this.date = new FormControl(data.dueDate);
    this.statuses = [
      {
        value: 0,
        viewValue: TaskStatus[0],
      },
      {
        value: 1,
        viewValue: 'In Progress',
      },
      {
        value: 2,
        viewValue: TaskStatus[2],
      },
    ];
    this.selectedStatus = this.statuses[this.tempTask.status].viewValue;
  }

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

  onDeleteClick(): void {}
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.tempTask.updatedDate = new Date();
    this.tempTask.edited = true;
    this.dialogRef.close(this.tempTask);
  }

  editDescription(): void {
    this.descriptionEdit = true;
  }
  onEditClick(): void {}
}

export interface TaskDetailsDialogData {
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  dueDate: Date;
  priority: number;
  status: number;
  isDeleted: boolean;
  edited: boolean;
}
