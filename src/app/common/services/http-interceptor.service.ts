import { LoadingService } from './loading.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/guard/auth.service';
import { catchError, timeout } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //REQUEST
    this.setLoadingStatus(true);
    const dupReq = this.setBearerToken(request);

    //RESPONSE
    const headerTimeout = dupReq.headers.get('timeout');
    const timeoutValue =
      headerTimeout != null ? Number(headerTimeout) : this.defaultTimeout;

    return next.handle(dupReq).pipe(
      timeout(timeoutValue),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.setLoadingStatus(false);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.setLoadingStatus(false);
        return throwError(error);
      }),
    );
  }

  private setBearerToken(request: HttpRequest<any>): HttpRequest<any> {

    if (request.headers.get("Authorization") != null && request.headers.get("Authorization") != ""){
      return request;
    }

    return request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${this.authService.accessToken}`
      ),
    });
  }

  private setLoadingStatus(active: boolean) {
    this.loadingService.isLoadingEmitter.emit(active);
  }
}
