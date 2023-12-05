import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { catchError } from 'rxjs';
import { ClientData } from '../data/client-data';
import { ClientLogin } from '../data/client-login';
import { VerifyData } from '../data/verify-data';
import { OrderData } from '../data/order-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: BackEndService) { }

  getOrders(callback: any) {
    this.http.get('orders')
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      });
  }

  deleteOrder(data: OrderData, callback: any) {
    console.log(data);
    this.http.post('orders/delete', data)
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      });
  }
}
