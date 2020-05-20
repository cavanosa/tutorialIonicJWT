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

  isAdmin(): boolean {
    if(this.getToken()) {
      const sub = jwt_decode(this.getToken()).sub;
      return (sub === 'admin');
    }
    return false;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
