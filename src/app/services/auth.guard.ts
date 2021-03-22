import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const returnUrl = route['_routerState']['url'];
    
    return new Observable<boolean>( 
      observer => {
        this.authenticationService
            .userSession()
            .subscribe(
              response =>{ 
                return observer.next(true);                        
              },
              error => {      
                this.router.navigateByUrl( 
                  this.router.createUrlTree(
                    ['/authentication'], 
                    {
                      queryParams: {
                        returnUrl: returnUrl
                      }
                    }
                  )
                );
                return observer.next(false);
              }
            );
      }
    );
  }
}