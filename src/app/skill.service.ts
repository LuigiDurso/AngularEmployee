import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Employee} from './Employee';
import {Skill} from './Skill';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseURL = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) { }

  /** GET skills from the server */
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseURL + 'skills')
      .pipe(
        catchError( (err) => {
          this.notificationService.error('Errore', 'Skills non trovate');
          return of(err as Skill[]);
        })
      );
  }
}
