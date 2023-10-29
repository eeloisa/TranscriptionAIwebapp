import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parameter } from '../parameter/parameter.model';
import { Audit } from './audit.model';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'audit/';
  constructor(private http: HttpClient) {}

  getList(): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.BASE_URL + 'all');
  }
}
