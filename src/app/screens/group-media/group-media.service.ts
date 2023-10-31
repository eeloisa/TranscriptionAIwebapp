import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupMedia } from './group-media.model';
import { groupMediaFull } from './group-media.mock';
import { GroupMediaPayload } from 'src/app/common/payload/group-media.payload';

@Injectable({
  providedIn: 'root',
})
export class GroupMediaService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'group-media/';
  constructor(private http: HttpClient) {}

  getById(groupMediaId: number): Observable<GroupMedia> {
    return this.http.get<GroupMedia>(this.BASE_URL + groupMediaId);
    //return of(groupMediaWithMediasMock.find((v) => v.id == id));
  }

  getList(): Observable<GroupMedia[]> {
    return this.http.get<GroupMedia[]>(this.BASE_URL + 'all');
    //return of(groupMediaMock);
  }

  delete(groupMediaId: number): Observable<any> {
    return this.http.delete(this.BASE_URL + groupMediaId);
  }

  deleteSelection(groupMediaId: number, selectedMediasId: number[]): Observable<any> {
    return this.http.post(this.BASE_URL + "medias/batch/" + groupMediaId, selectedMediasId);
  }

  save(groupMedia: GroupMediaPayload): Observable<any> {
    return this.saveGroupMedia(groupMedia);
    //return of(this.postMock(groupMedia));
  }

  private saveGroupMedia(groupMedia: GroupMediaPayload): Observable<any> {
    if (groupMedia.id == null) {
      return this.http.post(this.BASE_URL, groupMedia);
    } else {
      return this.http.put(this.BASE_URL, groupMedia);
    }
  }

  postMock(groupMedia: GroupMedia): boolean {
    groupMedia.id = new Date().getMilliseconds();
    groupMediaFull.push(groupMedia);
    return true;
  }
}
