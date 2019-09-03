import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

 intercept(req, next) {
     var token = localStorage.getItem('token')
     var authRequest = req.clone({
         headers: req.headers.set('Authorization', `Bearer ${token}`)
     });
     return next.handle(authRequest).pipe(
         tap(
             succ => {},
             err => {
                if(err.status == 401) {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('login')
                }else if(err.status == 403) {
                    this.router.navigateByUrl('forbidden')
                }
             }
         )
     )
 }
}
