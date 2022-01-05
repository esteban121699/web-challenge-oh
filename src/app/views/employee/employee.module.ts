import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { EmployeeRoutingModule } from './employee-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';
import { ModalDetailComponent } from './modals/modal-detail/modal-detail.component';


@NgModule({
  declarations: [IndexComponent, CreateComponent, UpdateComponent, ModalDeleteComponent, ModalDetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
