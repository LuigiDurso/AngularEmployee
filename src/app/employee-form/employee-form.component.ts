import {Component, OnInit} from '@angular/core';
import {Employee} from '../Employee';
import {EmployeeService} from '../employee.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Skill} from '../Skill';
import {SkillService} from '../skill.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee;
  employeeForm: FormGroup;
  skills: Skill[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private skillService: SkillService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getSkills();
    this.createForm();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id !== -1) {
      this.employeeService.getEmployeeByID(id).subscribe(emp => {
        this.employee = emp;
        this.rebuildForm();
      });
    }
  }

  getSkills() {
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      country: '',
      birthDate: '',
      newSkill: '',
      skillArray: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    this.employee = this.prepareSaveEmployee();
    this.employeeService.saveEmployee(this.employee).subscribe();
    this.rebuildForm();
  }

  prepareSaveEmployee(): Employee {
    const formModel = this.employeeForm.value;

    const skillsList: Skill[] = formModel.skillArray.map((skill: Skill) => {
      return Object.assign({}, skill);
    });

    const saveEmployee: Employee = {
      id: this.employee.id,
      name: formModel.name,
      surname: formModel.surname,
      country: formModel.country,
      birthDate: formModel.birthDate,
      skillList: skillsList
    };
    return saveEmployee;
  }

  rebuildForm() {
    this.employeeForm.reset({
      id: this.employee.id,
      name: this.employee.name,
      surname: this.employee.surname,
      country: this.employee.country,
      birthDate: this.employee.birthDate,
    });
    this.setSkills(this.employee.skillList);
    this.setDifferenceSkills();
  }

  setSkills(skills: Skill[]) {
    const skillsFGs = skills.map(skill => this.formBuilder.group(skill));
    const skillFormArray = this.formBuilder.array(skillsFGs);
    this.employeeForm.setControl('skillArray', skillFormArray);
  }

  setDifferenceSkills() {
    const formModel = this.employeeForm.value;

    const skillsList: Skill[] = formModel.skillArray.map((skill: Skill) => {
      return Object.assign({}, skill);
    });

    this.skills.filter(item => skillsList.indexOf(item) > 0);

  }

  getSkillList(): FormArray {
    return this.employeeForm.get('skillArray') as FormArray;
  }

  addSkill(newSkill) {
    const formModel = this.employeeForm.value;

    const skillsList: Skill[] = formModel.skillArray.map((skill: Skill) => {
      return Object.assign({}, skill);
    });

    const skillDuplicate = skillsList.find(sk => sk.skill === newSkill.trim());
    if (skillDuplicate === (null || undefined))  {
      this.getSkillList().push(this.formBuilder.group(
        this.skills.find(sk => sk.skill === newSkill.trim())
      ));
    }
  }

  removeSkill(index: number) {
    this.getSkillList().removeAt(index);
  }

}
