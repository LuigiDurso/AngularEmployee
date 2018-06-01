import {Component, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee;
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id !== -1) {
      this.employeeService.getEmployeeByID(id).subscribe(emp => {
        this.employee = emp;
        this.compileForm();
      } );
    }
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      id: '',
      name: '',
      surname: '',
      country: '',
      birthDate: '',
    });
  }

  onSubmit() {
    this.employee = this.prepareSaveEmployee();
    this.employeeService.saveEmployee(this.employee).subscribe();
    this.rebuildForm();
  }

  prepareSaveEmployee(): Employee {
    const formModel = this.employeeForm.value;
    const saveEmployee: Employee = Object.assign({}, formModel);
    return saveEmployee;
  }

  rebuildForm() {
    this.employeeForm.reset(this.employee);
  }

  compileForm() {
    this.employeeForm.setValue(this.employee);
  }

}
