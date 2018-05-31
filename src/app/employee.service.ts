import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/';
  constructor(
    private http: HttpClient
  ) { }

  /** GET employees from the server */
  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL + 'employees');
  }
}
