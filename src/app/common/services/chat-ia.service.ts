import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vertex } from './vertex.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatIaService {

  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'vertex/';
  constructor(private http: HttpClient) {}

  query(vertex: Vertex): Observable<Vertex> {
    return this.http.post<Vertex>(this.BASE_URL + "query", vertex);
  }
}
