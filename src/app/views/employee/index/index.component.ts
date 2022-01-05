import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { ModalDetailComponent } from '../modals/modal-detail/modal-detail.component';
import { ModalDeleteComponent } from '../modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'documentId', 'age', 'actions'];
  dataSource = new MatTableDataSource<Array<any>>();
  employees: Array<any> = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.employeeService.index().subscribe(
      data => {
        this.employees = data;
        this.dataSource.data = this.employees;
      }, error => {
      }
    )
  }

  show(item: any) {
    this.dialog.open(ModalDetailComponent, { data: item });
  }

  destroy(item: any) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, { data: item });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.employees.findIndex((e: any) => e.documentId == result.documentId);
        this.employees.splice(index, 1);
        this.dataSource.data = this.employees;
      }
    });
  }
}
