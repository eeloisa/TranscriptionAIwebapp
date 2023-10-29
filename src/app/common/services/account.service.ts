import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupMediaPayload } from 'src/app/common/payload/group-media.payload';
import { environment } from 'src/environments/environment';
import { Account, Profile } from '../../screens/user/account.model';
import { AccountPayload } from 'src/app/common/payload/account.payload';
import { ResponseBaseModel } from 'src/app/common/base/response-base.model';
import { AuthorizationPayload } from 'src/app/common/payload/authorization.payload';
import { AuthorizationTypeEnum } from '../enums/authorization-type.enum';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BASE_URL: string = environment.APP_API_URL + '/api/v1/' + 'account-custom/';

  APPLICATION_ID: string = environment.APP_APPLICATION_ID;
  INSTITUTION_ID: string = environment.APP_INSTITUTION_ID;
  PROVIDER_ID: string = environment.APP_PROVIDER_ID;
  AUTH_TYPE: AuthorizationTypeEnum = AuthorizationTypeEnum.Internal;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  login(authorization: AuthorizationPayload): Observable<any> {
    authorization.applicationId = this.APPLICATION_ID;
    authorization.type = this.AUTH_TYPE;

    return this.http.post<ResponseBaseModel>(
      `${this.BASE_URL}authorization`,
      authorization
    );
  }

  refreshToken(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    let tokenDecoded = this.jwtHelperService.decodeToken(token);
    let login = tokenDecoded.login;

    return this.http.get<ResponseBaseModel>(
      `${this.BASE_URL}refresh-token/` +
        this.APPLICATION_ID +
        '/account/' +
        login,
      httpOptions
    );
  }

  getById(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.BASE_URL + 'account/' + accountId);
  }

  getList(): Observable<Account[]> {
    return this.http.get<Account[]>(
      this.BASE_URL +
        'application/' +
        this.APPLICATION_ID +
        '/account-with-roles'
    );
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(
      this.BASE_URL + 'profiles/' + this.APPLICATION_ID
    );
  }

  delete(accountId: string): Observable<any> {
    return this.http.delete(this.BASE_URL + accountId);
  }

  save(accountPayload: AccountPayload): Observable<any> {
    return this.saveAccount(accountPayload);
  }

  private saveAccount(accountPayload: AccountPayload): Observable<any> {
    accountPayload.institutionId = this.INSTITUTION_ID;
    accountPayload.providerId = this.PROVIDER_ID;
    accountPayload.applicationId = this.APPLICATION_ID;

    if (accountPayload.accountId == null) {
      return this.http.post(this.BASE_URL, accountPayload);
    } else {
      return this.http.put(this.BASE_URL, accountPayload);
    }
  }
}
