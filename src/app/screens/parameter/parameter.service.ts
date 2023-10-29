import { Injectable } from '@angular/core';
import { Parameter } from './parameter.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'system-parameter/';
  constructor(private http: HttpClient) {}

  getList(): Observable<Parameter[]> {
    return this.http.get<Parameter[]>(this.BASE_URL + 'all');
  }

  delete(groupMediaId: number): Observable<any> {
    return this.http.delete(this.BASE_URL + groupMediaId);
  }

  put(payload: Parameter): Observable<any> {
    return this.http.put<Parameter>(this.BASE_URL, payload);
  }
}
