import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. CHECK VELOCE: Se la variabile locale è true, permetti subito l'accesso.
  if (authService.isLoggedInSnapshot()) {
    console.log('AuthGuard: Stato locale TRUE, accesso concesso immediatamente.');
    return true;
  }

  // 2. CHECK COMPLETO: Lo stato locale è FALSE, verifica con il BE se la sessione è valida.
  console.log('AuthGuard: Stato locale FALSE, verifico con il backend...');

  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        // Il check API ha avuto successo (200), l'accesso è concesso.
        return true;
      }
      // Il check API ha fallito (401), reindirizza
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      // In caso di errore non gestito (come un errore di rete), reindirizza
      router.navigate(['/login']);
      return of(false);
    })
  );
};
