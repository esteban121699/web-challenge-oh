import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean = false;
  disableSubmitButton: Boolean = false;
  error: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    readonly snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      documentId: [null, [Validators.required, Validators.maxLength(15)]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      dateOfBirth: [null, [Validators.required]],
      salary: [null, [Validators.required, Validators.min(1)]]
    });
  }

  submit() {
    this.submitted = true;
    this.disableSubmitButton = true;

    if (this.form.invalid) {
      this.disableSubmitButton = false;
      return;
    }

    this.employeeService.create(this.form.value).subscribe(
      data => {
        this.disableSubmitButton = false;
        this.snackBar.open('El empleado ha sido registrado', '', { duration: 2000 });
        this.router.navigate(['/employees']);
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
