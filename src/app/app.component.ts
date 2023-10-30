import { AuthService } from 'src/app/guard/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from './common/services/loading.service';
import { NbLayoutComponent, NbThemeService } from '@nebular/theme';
import { ParameterService } from './screens/parameter/parameter.service';
import { Parameter } from './screens/parameter/parameter.model';
import { getParamValue } from './common/utils/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  isLogged = false;
  isLoading = false;

  params: Parameter[] = [];

  styles: string[] = ["default", "dark", "custom"];

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private parameterService: ParameterService,
    private themeService: NbThemeService
  ) {
    this.isLogged = authService.logado;

    this.authService.isLoggedEmitter.subscribe((data) => {
      this.isLogged = data;
    });

    this.loadingService.isLoadingEmitter.subscribe((data) => {
      this.isLoading = data;
    });
  }

  ngOnInit() {
    this.parameterService.getList().subscribe((r) => {
      this.setStyleColor(getParamValue(r, "style-base-name"));
    });
  }

  setStyleColor(style: string) {
    if(this.styles.includes(style)){
      this.themeService.changeTheme(style);
      return;
    }

    this.themeService.changeTheme('default');
  }
}
