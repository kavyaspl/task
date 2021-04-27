import { Component, Input, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskListComponent } from '../task-list.component';

export interface Task {

  title: string;
  taskid: number;
  duedate: string;
  status: string;
  assignedto: string;
 
}

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  title: string;
  taskid: number;
  duedate: string;
  status: string;
  assignedto: string;


  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Task) {


     }

    onNoClick(): void {
      this.dialogRef.close();
    }
    storeData() 
    {
      this.data.title = this.title;
      this.data.status = this.status;
      this.data.duedate = this.duedate;
      this.data.assignedto = this.assignedto;
    }

  ngOnInit(): void {
  }

}
