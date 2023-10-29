import { NgModule } from '@angular/core';

import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ForbiddenComponent } from './screens/forbidden/forbidden.component';
import { ParameterComponent } from './screens/parameter/parameter.component';
import { ReportComponent } from './screens/report/report.component';
import { UserComponent } from './screens/user/user-view/user.component';
import { GroupMediaListComponent } from './screens/group-media/group-media-list/group-media-list.component';
import { GroupMediaComponent } from './screens/group-media/group-media-view/group-media.component';
import { TranscriptionComponent } from './screens/transcription/transcription-view/transcription.component';
import { TranscriptionListComponent } from './screens/transcription/transcription-list/transcription-list.component';
import { AuditComponent } from './screens/audit/audit.component';
import { UserListComponent } from './screens/user/user-list/user-list.component';
import { BlacklistWordsComponent } from './screens/blacklist-words/blacklist-words.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  data: { requiresAuthentication: false, requiresPermission: false }},
  { path: 'forbidden', component: ForbiddenComponent,  data: { requiresPermission: false }},

  { path: 'group-media', component: GroupMediaComponent, canActivate:[AuthGuard]},
  { path: 'group-media/:id', component: GroupMediaComponent, canActivate:[AuthGuard]},
  { path: 'group-media-list', component: GroupMediaListComponent, canActivate:[AuthGuard]},

  { path: 'transcription/:id', component: TranscriptionComponent, canActivate:[AuthGuard]},
  { path: 'transcription-list', component: TranscriptionListComponent, canActivate:[AuthGuard]},

  { path: 'blacklist', component: BlacklistWordsComponent, canActivate:[AuthGuard]},

  { path: 'user', component: UserComponent, canActivate:[AuthGuard]},
  { path: 'user/:id', component: UserComponent, canActivate:[AuthGuard]},
  { path: 'user-list', component: UserListComponent, canActivate:[AuthGuard]},

  { path: 'parameter', component: ParameterComponent, canActivate:[AuthGuard]},
  { path: 'report', component: ReportComponent, canActivate:[AuthGuard]},
  { path: 'audit', component: AuditComponent, canActivate:[AuthGuard]},

  { path: '', component: HomeComponent, data: { requiresPermission: false }},
  { path: '**', redirectTo: '',  data: { requiresPermission: false }}
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
