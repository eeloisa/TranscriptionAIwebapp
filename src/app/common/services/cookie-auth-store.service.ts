import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class CookieStoreService {
  tokenName = environment.APP_BRAINZ_NAME_TOKEN;

  getAccessToken(): string {
    return this.getCookie(this.tokenName);
  }

  saveAccessToken(accessToken: string) {
    this.setCookie(this.tokenName, accessToken);
  }

  removeAccessToken() {
    this.setCookie(this.tokenName, '');
  }

  private getCookie(name: string) {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookieStart = document.cookie.indexOf(cookieName);

    let cookieValue = null;
    let cookieEnd;

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }

    return cookieValue == null || cookieValue === '' ? null : cookieValue;
  }

  private setCookie(name, value) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookieText += '; path=' + '/';
    document.cookie = cookieText;
  }
}
