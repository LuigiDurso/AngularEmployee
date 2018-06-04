import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFilterPipe } from './employee-filter.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeleteDialogContentComponent } from './delete-dialog-content/delete-dialog-content.component';

const appRoutes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: 'newEmployee/:id', component: EmployeeFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    EmployeesListComponent,
    EmployeeFilterPipe,
    EmployeeFormComponent,
    DeleteDialogComponent,
    DeleteDialogContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    }),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogContentComponent]
})
export class AppModule { }
