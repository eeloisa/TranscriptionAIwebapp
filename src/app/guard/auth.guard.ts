import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

export const AuthGuard = () => {
  const authService = inject(AuthService);

  if (!authService.logado) {
    authService.validateLogin();
    return false;
  }

  return true;
};
