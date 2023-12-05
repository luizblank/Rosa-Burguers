import { CanActivateFn } from '@angular/router';
import { ClientService } from './server/services/client-service.service';
import { HttpClient } from '@angular/common/http';
import { BackEndService } from './server/services/backend.service';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

export const yourGuardGuard: CanActivateFn = (route, state) => { 
  var session = sessionStorage.getItem('jwt');
  return session == null;
};
