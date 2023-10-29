import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blacklist } from './backlist.model';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'blacklist-words/';
  constructor(private http: HttpClient) {}

  getList(): Observable<Blacklist[]> {
    return this.http.get<Blacklist[]>(this.BASE_URL + 'all');
  }

  delete(groupMediaId: number): Observable<any> {
    return this.http.delete(this.BASE_URL + groupMediaId);
  }

  save(playload: Blacklist): Observable<any> {
    return this.saveGroupMedia(playload);
  }

  private saveGroupMedia(playload: Blacklist): Observable<any> {
    if (playload.id == null) {
      return this.http.post(this.BASE_URL, playload);
    } else {
      return this.http.put(this.BASE_URL, playload);
    }
  }
}
