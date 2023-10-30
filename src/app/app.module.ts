import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbAuthModule } from '@nebular/auth';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbSidebarModule,
  NbInputModule,
  NbMenuModule,
  NbActionsModule,
  NbContextMenuModule,
  NbStepperModule,
  NbTooltipModule,
  NbDialogModule,
  NbSelectModule,
  NbCheckboxModule,
  NbDatepicker,
  NbDatepickerModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ForbiddenComponent } from './screens/forbidden/forbidden.component';
import { MenuComponent } from './common/layout/menu/menu.component';
import { UserComponent } from './screens/user/user-view/user.component';
import { ParameterComponent } from './screens/parameter/parameter.component';
import { ReportComponent } from './screens/report/report.component';
import { ProfileMenuComponent } from './common/layout/profile-menu/profile-menu.component';
import { GroupMediaComponent } from './screens/group-media/group-media-view/group-media.component';
import { GroupMediaListComponent } from './screens/group-media/group-media-list/group-media-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConfirmComponent } from './common/layout/confirm/confirm.component';
import { MediaComponent } from './screens/group-media/media-view/media.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import {
  DEFAULT_TIMEOUT,
  HttpInterceptorService,
} from './common/services/http-interceptor.service';
import { TranscriptionComponent } from './screens/transcription/transcription-view/transcription.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { SpeakerViewComponent } from './screens/transcription/speaker-view/speaker-view.component';
import { TranscriptionListComponent } from './screens/transcription/transcription-list/transcription-list.component';
import { AuditComponent } from './screens/audit/audit.component';
import { UserListComponent } from './screens/user/user-list/user-list.component';
import { AuthService } from './guard/auth.service';
import { CookieStoreService } from './common/services/cookie-auth-store.service';
import { AuthGuard } from './guard/auth.guard';
import { BlacklistWordsComponent } from './screens/blacklist-words/blacklist-words.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { DownloadComponent } from './common/layout/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
    MenuComponent,
    GroupMediaComponent,
    UserComponent,
    ParameterComponent,
    ReportComponent,
    ProfileMenuComponent,
    GroupMediaListComponent,
    ConfirmComponent,
    MediaComponent,
    TranscriptionComponent,
    TranscriptionListComponent,
    SpeakerViewComponent,
    AuditComponent,
    UserListComponent,
    BlacklistWordsComponent,
    DownloadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbActionsModule,
    NbAlertModule,
    NbCardModule,
    NbInputModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbAuthModule,
    NbStepperModule,
    NbTooltipModule,
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  providers: [
    AuthService,
    CookieStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: DEFAULT_TIMEOUT, useValue: 10000 }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetter() {
  const name = 'token';
  const cookieName = `${encodeURIComponent(name)}=`;
  const cookieStart = document.cookie.indexOf(cookieName);

  let cookieValue = null;
  let cookieEnd;

  if (cookieStart > -1) {
    cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    );
  }

  return cookieValue == null || cookieValue === '' ? null : cookieValue;
}
