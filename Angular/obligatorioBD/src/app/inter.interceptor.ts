import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable()
export class InterInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    
    if (this.loginService.estaLogeado()) {
      const reqCopy = request.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.loginService.getToken(),
        },
      })
      console.log(reqCopy)
      //debugger
      return next.handle(reqCopy);

    } else {
      return next.handle(request);
    }
  }
}
