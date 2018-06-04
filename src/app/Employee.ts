import {Skill} from './Skill';

export class Employee {
  id: number;
  name: string;
  surname: string;
  country: string;
  birthDate: string;
  skillList: Skill[];
}
