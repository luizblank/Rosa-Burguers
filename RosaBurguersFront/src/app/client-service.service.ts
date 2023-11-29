import { Injectable } from '@angular/core';
import { ClientData } from './client-data';
import { ApiClientService } from './api-client.service';
import { catchError } from 'rxjs';
import { ClientLogin } from './client-login';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  constructor(private http: ApiClientService) { }

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
}
