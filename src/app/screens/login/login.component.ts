import { Component, OnInit } from '@angular/core';
import { ShowMessages } from 'src/app/common/model/show-messages.model';
import { Login } from 'src/app/common/model/login.model';
import { AuthService } from 'src/app/guard/auth.service';
import { environment } from 'src/environments/environment';
import { AuthorizationPayload } from 'src/app/common/payload/authorization.payload';
import { AccountService } from 'src/app/common/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  showMessages: ShowMessages = new ShowMessages();

  errors: string[] = [];
  messages: string[] = [];

  rememberMe: boolean = false;
  submitted: boolean = false;

  forms_validation_email_required = true;
  forms_validation_password_required = true;
  forms_validation_password_minLength = 4;
  forms_validation_password_maxLength = 16;

  urlToken: string = '';

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {
    if (this.authService.isLogged) {
      this.goToApp();
    }
  }

  private goToApp() {
    window.location.href = environment.APP_WEB_URL + this.urlToken;
  }

  ngOnInit() {}

  loginSubmit() {
    let authorizationPayLoad: AuthorizationPayload = new AuthorizationPayload();
    authorizationPayLoad.login = this.login.email;
    authorizationPayLoad.password = btoa(this.login.password);

    this.accountService.login(authorizationPayLoad).subscribe((r) => {
      if (r == undefined || !r.success) {
        //LOG ERRROR
        console.info("LOGIN ERROR-->", r)
        return;
      }

      this.urlToken = '?' + environment.APP_BRAINZ_NAME_TOKEN + '=' + r.token;
      this.processLoginResponse();
    });
  }

  private processLoginResponse() {
    this.goToApp();
  }
}
