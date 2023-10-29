import { timeout } from 'rxjs/operators';
import {
  DownloadPayload,
  SpeakerPayload,
} from './../../common/payload/group-media.payload';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupMedia } from '../group-media/group-media.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { groupMediaFull } from '../group-media/group-media.mock';
import { Chat } from 'src/app/common/model/chat.model';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'transcription/';
  constructor(private http: HttpClient) {}

  getByGroupMediaId(groupMediaId: number): Observable<GroupMedia> {
    return this.http.get<GroupMedia>(
      this.BASE_URL + 'group-media/' + groupMediaId
    );
    //return of(groupMediaFull.find((v) => v.id == groupMediaId));
  }

  getList(): Observable<GroupMedia[]> {
    return this.http.get<GroupMedia[]>(this.BASE_URL + 'all/transcribed');
    //return of(groupMediaMock);
  }

  delete(groupMediaId: number): Observable<any> {
    return this.http.delete(this.BASE_URL + groupMediaId);
  }

  patch(payload: SpeakerPayload): Observable<any> {
    return this.http.patch<GroupMedia>(
      this.BASE_URL + 'speaker/change-name',
      payload
    );
  }

  download(
    payload: DownloadPayload,
    groupMediaId: number
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json', // We send JSON
      }),
      responseType: 'blob' as 'json', // We accept plain text as response.
    };

    return this.http.post<any>(
      this.BASE_URL + 'download/doc/' + groupMediaId,
      payload,
      httpOptions
    );
  }

  chatAI(payload: Chat): Observable<Chat> {
    const httpOptions = {
      headers: new HttpHeaders({
        timeout: 0
      })
    };

    return this.http.post<Chat>(this.BASE_URL + "chat-ai", payload, httpOptions);
  }
}
