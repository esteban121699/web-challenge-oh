import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  disableSubmitButton: Boolean = false;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  destroy(): void {
    this.disableSubmitButton = true;
    this.employeeService.destroy(this.data.documentId).subscribe(
      data => {
        this.disableSubmitButton = false;
        this.dialogRef.close(data);
      }, error => {
        this.disableSubmitButton = false;
      }
    )
  }

  hide() {
    this.dialogRef.close();
  }
}
