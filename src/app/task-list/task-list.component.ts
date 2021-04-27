import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatCheckboxModule,} from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';


export interface Task {
  title: string;
  taskid: number;
  duedate: string;
  status: string;
  assignedto: string;
}
let TASK_DATA: Task[] = [
  {taskid: 1, title: 'Analysis of get_detail FM', duedate: "2021-04-16", status: 'Done', assignedto: 'John'},
  {taskid: 2, title: 'Connector - Bug fixes', duedate: "2021-05-21", status: 'New', assignedto: 'John'},
  {taskid: 3, title: 'Downport Notes', duedate: "2021-04-16", status: 'In Progress', assignedto: 'John'},
  {taskid: 4, title: 'Unit testing', duedate: "2021-05-30", status: 'In Progress', assignedto: 'John'},
  {taskid: 5, title: 'Data Analysis', duedate: "2021-05-18", status: 'New', assignedto: 'John'},
  {taskid: 6, title: 'Analysis of add_detail FM', duedate: "2021-09-09", status: 'Cancelled', assignedto: 'John'},
  {taskid: 7, title: 'Reverse KT', duedate:"2021-06-09", status: 'New',assignedto: 'Mike'},
  {taskid: 8, title: 'Unit testing', duedate: "2021-10-20", status: 'Done',assignedto: 'Mike'},
  {taskid: 9, title: 'Connector Prototyping', duedate: "2021-12-22", status: 'Done',assignedto: 'Mike'}
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  title: string;
  taskid: number;
  duedate: string;
  status: string;
  assignedto: string;
  
  displayedColumns: string[] = ['select','taskid', 'title','status','duedate','assignedto'];
  dataSource = new MatTableDataSource<Task>(TASK_DATA);
  public isDisabled : boolean = true;

  constructor(public dialog: MatDialog) {


   }
   openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '250px',
      data: { taskid:this.taskid,title:this.title,duedate:this.duedate,status:this.status,assignedto:this.assignedto}
    });

    dialogRef.afterClosed().subscribe(result => {
     
      result.taskid = 10;
      this.dataSource.data.push(result);
    });
  }

  ngOnInit(): void {
  }

  selection = new SelectionModel<Task>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.taskid + 1}`;
  }

  onSelectCheckbox(row?: Task) {

    this.selection.toggle(row);
    if (this.selection.isSelected(row) && row.status != 'Done' && row.status != 'Cancelled' && this.dateCheck(row.duedate))
    {
      this.isDisabled = false;
    }
    else
    {
      this.isDisabled = true;
    }
  }

  dateCheck (duedate : string) : boolean {
   let dateParts = duedate.split('-');
   let currentDate = new Date();
    if (+dateParts[0] >= currentDate.getFullYear()  && +dateParts[1] >= currentDate.getMonth() || +dateParts[2] >= currentDate.getDate() )
    {
      return true;
    }
    return false;
  }


  markAsDone()
  {
    let row:any;
    let i = 0;

    for ( i=0; i < this.selection.selected.length;i++ )
    {
      row = this.selection.selected[i];
      if (this.selection.isSelected(row) && row.status != 'Done' && row.status != 'Cancelled' && this.dateCheck(row.duedate))
    {
      this.selection.selected[i].status = 'Done';
    }

      
    }

    this.isDisabled = true;


  }

}
