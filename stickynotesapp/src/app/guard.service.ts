import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {map,take,tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuardService  implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>|boolean {
    
return this.authService.userobs.pipe(take(1)).pipe(map(user=>!!user),tap(loggedIn=>{
  if(!loggedIn){
    console.log("access denied");
    this.router.navigate(['/login']);
  }
}));
}
}