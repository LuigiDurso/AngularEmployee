import {Component, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Array<Employee>;

  constructor(
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit() {
    this.employees = [];
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  onDeleteConfirm(employeesID: number): void {
    this.employeeService.deleteEmployeeByID(employeesID).subscribe();
    this.getEmployees();
  }
}
