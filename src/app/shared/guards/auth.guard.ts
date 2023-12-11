import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private afAuth: AngularFireAuth) {}
  canActivate(): Observable<boolean> {
    return this.checkIsUserLogin();
  }
  private checkIsUserLogin(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
}

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const permissionsService= inject(PermissionsService);
  const router = inject(Router);

  return permissionsService.canActivate().pipe(
    tap((permission: boolean) => {
      if (!permission) {
        router.navigate(['/login']);
      }
    })
  );

};
