import { Application, Profile } from './../common/model/authorization.model';
import { Injectable, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
  Router,
  Event as NavigationEvent,
  RoutesRecognized,
} from '@angular/router';
import { CookieStoreService } from '../common/services/cookie-auth-store.service';
import { UserBrainz } from '../common/model/user-brainz.model';

import { environment } from 'src/environments/environment';

import { AccountService } from '../common/services/account.service';
import { forEach } from 'lodash';
import { Account } from '../screens/user/account.model';
@Injectable()
export class AuthService {
  isLoggedEmitter = new EventEmitter<boolean>();
  account = new EventEmitter<Account>();

  routesPermissions: Map<string, string> = new Map<string, string>();

  constructor(
    private jwtHelperService: JwtHelperService,
    private cookieStoreService: CookieStoreService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.mapRoutesPermissions();

    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof RoutesRecognized) {
        this.validateAuthentication(event);
      }
    });
  }

  private mapRoutesPermissions() {
    this.routesPermissions.set('audit', 'audit');
    this.routesPermissions.set('blacklist', 'blacklist-words');
    this.routesPermissions.set('parameter', 'system-parameter');
    this.routesPermissions.set('report', 'reports');
    this.routesPermissions.set('group-media', 'group-media');
    this.routesPermissions.set('user', 'account-custom');
    this.routesPermissions.set('transcription', 'transcription');
  }

  private permissions: string[] = null;

  public get accessToken() {
    return this.cookieStoreService.getAccessToken();
  }

  public get isLogged(): boolean {
    return this.loggedUser != null;
  }

  public get loggedUser(): UserBrainz {
    const accessToken = this.accessToken;
    if (!accessToken || this.isTokenExpired(accessToken)) {
      return null;
    }

    const token = this.decodeToken(accessToken);

    const aplications: Application[] = JSON.parse(token.applications);

    return {
      code: token.sub,
      name: token.name,
      email: token.login,
      profile: aplications[0].Profiles[0].Name,
    };
  }

  private decodeToken(token) {
    return this.jwtHelperService.decodeToken(token);
  }

  private async validateAuthentication(event: RoutesRecognized) {
    if (event.url.includes('/login')) {
      this.isLoggedEmitter.emit(false);
      return;
    }

    if (!this.isLogged) {
      this.validateLogin();
      return;
    }

    const requiresAuthentication: boolean =
      event.state.root.firstChild.data['requiresAuthentication'] ||
      event.state.root.firstChild.data['requiresAuthentication'] === undefined;

    if (requiresAuthentication) {
      this.validatePermission(event);
    }
  }

  private async validatePermission(event: RoutesRecognized) {
    if (event.url.includes('/forbidden') || event.url == '/') {
      return;
    }

    const requiresPermission: boolean =
      event.state.root.firstChild.data['requiresPermission'] ||
      event.state.root.firstChild.data['requiresPermission'] === undefined;

    const route = event.url;

    if (requiresPermission) {
      if (!this.isPermittedSystem() || !this.isPermittedRoute(route)) {
        return this.router.navigate(['/forbidden'], {
          queryParams: { route: route },
        });
      }
    }
  }

  public isPermittedSystem(): boolean {
    const aplications: Application[] = JSON.parse(
      this.decodeToken(this.accessToken).applications
    );

    let permitted =
      environment.APP_APPLICATION_ID == aplications[0].Id &&
      'transcription_user_api' != aplications[0].Profiles[0].Code;

    if (!permitted) {
      this.isLoggedEmitter.emit(false);
    }

    return permitted;
  }

  public isPermittedRoute = function (rota: string): boolean {
    if (!this.permissions) {
      this.getPermissions(this.accessToken);
    }

    if (this.permissions[0].toLowerCase().trim() == 'all') {
      return true;
    }

    let authorized = false;

    Array.from(this.routesPermissions).forEach((map: Map<string, string>) => {
      let rotaMapKey: string = map[0];
      let rotaMapValue: string = map[1];

      if (
        rota.includes(rotaMapKey) &&
        this.permissions.find((p) => p == rotaMapValue) != undefined
      ) {
        authorized = true;
        return;
      }
    });

    return authorized;
  };

  public validateLogin() {
    const NAME_TOKEN = environment.APP_BRAINZ_NAME_TOKEN;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlToken = urlParams.get(NAME_TOKEN);

    if (urlToken == null || urlToken == '') {
      this.redirectToLogin();
      return;
    }

    this.accountService.refreshToken(urlToken).subscribe((r) => {
      if (r == undefined || !r.success) {
        this.redirectToLogin();
        return;
      }

      this.loginProcess(r.token);

      this.router.navigate(['/group-media-list']);
    });
  }

  private loginProcess(token: string) {
    this.saveAccessToken(token);
    this.isLoggedEmitter.emit(true);
  }

  private saveAccessToken(accessToken: string) {
    this.cookieStoreService.saveAccessToken(accessToken);
    this.getPermissions(accessToken);
  }

  private getPermissions(accessToken: string) {
    const aplications: Application[] = JSON.parse(
      this.decodeToken(accessToken).applications
    );

    this.permissions = this.generateRoles(aplications);
  }

  private generateRoles(aplications: Application[]): string[] {
    const roles: Profile[] = aplications[0].Profiles[0].Roles;

    const roleCodes: string[] = [];
    roles.forEach((role) => {
      roleCodes.push(role.Code);
    });

    return roleCodes;
  }

  public logout() {
    this.removeAccessToken();
    this.redirectToLogin();
  }

  private removeAccessToken() {
    this.cookieStoreService.removeAccessToken();

    this.permissions = [];
  }

  public isTokenExpired(accessToken: string): boolean {
    accessToken = accessToken || this.accessToken;
    if (!accessToken) {
      return true;
    }

    return this.jwtHelperService.isTokenExpired(accessToken);
  }

  public getTokenExpirationDate(): Date {
    const accessToken = this.accessToken;
    if (!accessToken) {
      return null;
    }

    return this.jwtHelperService.getTokenExpirationDate(accessToken);
  }

  public redirectToLogin(event?: RoutesRecognized) {
    if (!environment.isProductionMode) {
      this.isLoggedEmitter.emit(false);
      return this.router.navigate(['/login']);
    } else {
      document.location.href = environment.APP_ACCOUNT_REDIRECT;
    }
  }
}
