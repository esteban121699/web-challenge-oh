import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean = false;
  disableSubmitButton: Boolean = false;
  documentId: any = null;
  loading: Boolean = true;
  error: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    readonly snackBar: MatSnackBar,
    private location: Location
  ) {
    this.documentId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm();
    this.show();
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      dateOfBirth: [null, [Validators.required]],
      salary: [null, [Validators.required, Validators.min(1)]]
    });
  }

  show() {
    this.employeeService.show(this.documentId).subscribe(
      data => {
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          dateOfBirth: data.dateOfBirth,
          salary: data.salary
        })
        this.loading = false;
      }, error => {
        this.loading = false;
      }
    )
  }

  submit() {
    this.submitted = true;
    this.disableSubmitButton = true;

    if (this.form.invalid) {
      this.disableSubmitButton = false;
      return;
    }

    this.employeeService.update(this.documentId, this.form.value).subscribe(
      data => {
        this.disableSubmitButton = false;
        this.error = null;
        this.snackBar.open('El empleado ha sido actualizado', '', { duration: 2000 });
      }, error => {
        this.disableSubmitButton = false;
        this.error = error;
      }
    )
  }

  back() {
    this.location.back();
  }
}
