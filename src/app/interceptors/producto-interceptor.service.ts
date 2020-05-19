import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoInterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone( {headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(authReq);
  }
}

export const interceptorProvider = [ {provide: HTTP_INTERCEPTORS, useClass: ProductoInterceptorService, multi: true} ];
