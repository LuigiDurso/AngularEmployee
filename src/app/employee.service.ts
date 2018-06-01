import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Employee} from './Employee';
import {NotificationsService} from 'angular2-notifications';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
  }

  /** GET employees from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseURL + 'employees')
      .pipe(
        catchError( (err) => {
          this.notificationService.error('Errore', 'Utenti non trovati');
          return of(err as Employee[]);
        })
      );
  }

  /** POST new employee to server */
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseURL + 'newEmployee', employee, httpOptions)
      .pipe(
        catchError( (err) => {
          this.notificationService.error('Errore', 'Utente non salvato ');
          return of(err as Employee);
        })
      );
  }

  /** GET employee by id */
  getEmployeeByID(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseURL + 'employee/' + id)
      .pipe(
        catchError( (err) => {
          this.notificationService.error('Errore', 'Utente non trovato ');
          return of(err as Employee);
        })
      );
  }
}
