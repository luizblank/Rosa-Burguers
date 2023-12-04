import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { catchError } from 'rxjs';
import { ClientData } from '../data/client-data';
import { ClientLogin } from '../data/client-login';
import { VerifyData } from '../data/verify-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: BackEndService) { }

  verify(callback: any) {
    this.http.get('orders')
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      })
  }
}
