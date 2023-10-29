import { AuthService } from 'src/app/guard/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from './common/services/loading.service';
import { NbLayoutComponent, NbThemeService } from '@nebular/theme';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  isLogged = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private themeService: NbThemeService
  ) {

    this.isLogged = authService.logado;

    this.authService.isLoggedEmitter.subscribe((data) => {
      this.isLogged = data;
    });

    this.loadingService.isLoadingEmitter.subscribe((data) => {
      this.isLoading = data;
    });

    this.themeService.changeTheme('default');
  }

  ngOnInit() {}

}
