import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


  public getUserName(): string {
    let userName = '';
    if(this.getToken()) {
      const sub = jwt_decode(this.getToken()).sub;
      userName = sub;
    }
    return userName;
  }

  public getAuthorities(): string[] {
   const roles: string[] = [];
   if(this.getToken()) {
    const sub = jwt_decode(this.getToken()).sub;
    if(sub === 'admin'){
      roles.push('admin');
    }
    roles.push('user');
   }
   return roles;
  }

  isAdmin(): boolean {
    return this.getAuthorities().length > 1;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
