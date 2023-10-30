import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DownloadTypeEnum } from 'src/app/common/enums/download-type.enum';
import { ReportEnum } from 'src/app/common/enums/report.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'report/';
  constructor(private http: HttpClient) {}

  download(report: ReportEnum, format: DownloadTypeEnum): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json', // We send JSON
      }),
      responseType: 'blob' as 'json', // We accept plain text as response.
    };

    return this.http.post<any>(
      this.BASE_URL +
        'download/' +
        ReportEnum[report].replaceAll('_', '-') +
        '/format/' +
        format,
      {},
      httpOptions
    );
  }
}
