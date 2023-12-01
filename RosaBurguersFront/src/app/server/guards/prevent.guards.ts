import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

export const RegLoginAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ) => {
    var session = sessionStorage.getItem('jwt');
    if (session == null)
        return true;
    
    return false;
};
