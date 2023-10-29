import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserParameter } from './user-parameter.model';

@Injectable({
  providedIn: 'root',
})
export class UserParameterService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'user-parameter';
  constructor(private http: HttpClient) {}

  put(payload: UserParameter): Observable<any> {
    return this.http.put<UserParameter>(this.BASE_URL, payload);
  }

  patch(payload: UserParameter): Observable<any> {
    return this.http.patch<UserParameter>(
      this.BASE_URL + "/" + payload.id + "/value/" + payload.value, {}
    );
  }
}
