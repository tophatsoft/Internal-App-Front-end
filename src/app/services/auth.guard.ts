import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    userRole
    constructor(private router: Router, private auth: AuthenticationService) { }

    get isAuthenticated() {
       
        return !!localStorage.getItem('token')
       
    }
    get isAdmin() {
        if (localStorage.getItem('token')) {
            var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
            var userRole = payLoad.role;
            this.userRole = userRole;
        }
        if (this.userRole == "Admin") {
            return true;
        } else { return false }
    }

    //prevent the navigation on pages if not authenticated
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token') != null) {
            let roles = next.data['permittedRoles'] as Array<string>;
            if (roles) {
                if (this.auth.roleMatch(roles)) return true;
                else {
                    this.router.navigateByUrl('/forbidden');
                    return false;
                }
            }
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl("login").then(x => location.reload())
       
    }
}
