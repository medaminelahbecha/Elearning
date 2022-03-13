import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/userService';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(private UserService : UserService , private router :Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let flag = false
if(this.UserService.isLoggedIn()){
  flag=true;
}else {
  let currenturl = state.url
this.router.navigate(['login'],{
  queryParams : {
    returnUrl : currenturl
  }
})
}


    return flag
  }
}