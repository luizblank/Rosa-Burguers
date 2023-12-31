import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { catchError } from 'rxjs';
import { ClientData } from '../data/client-data';
import { ClientLogin } from '../data/client-login';
import { VerifyData } from '../data/verify-data';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: BackEndService) { }

  register(data: ClientData, callback: any) {
    this.http.post('user/register', data)
      .pipe(
        catchError(callback)
      )
      .subscribe(response => callback(response));
  }

  login(data: ClientLogin, callback: any) {
    this.http.post('user/login', data)
      .subscribe(
        response => {
          callback(response);
        },
        error => {
          callback(null);
        });
  }

  verify(data: VerifyData) {
    return this.http.get('user/verify/' + data.jwt)
  }
}
