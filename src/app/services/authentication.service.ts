import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private state: RouterStateSnapshot;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: any): Observable<any>{
    return this.http.post<any>('/api/login', usuario);
  }

  logout(): Promise<any>{
    return this.http.get<any>('/api/logout').toPromise();
  }

  redirectToLogin(){
      this.state = this.router.routerState.snapshot;
      this.router.navigate(['/authentication'], { queryParams: { returnUrl: this.state.url }});
  }

  userSession(): Observable<any>{
      return this.http.get<any>('/api/recrutador-session');
  }
}
