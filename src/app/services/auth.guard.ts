
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

  Injectable({
    providedIn: 'root'
  })

export class AuthGuard {

  constructor( 
    private authService: AuthService, 
    private router: Router, 
    private toaster: ToastrService ) {}

 canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    if (this.authService.isLoggedInGuard) {
    return true;
    }
    else {
      this.toaster.warning('You dont have permission to acces this page');
      this.router.navigate(['/login']);
      return false;
    }
   }
}
