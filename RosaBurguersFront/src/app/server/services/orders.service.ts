import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { OrderData } from '../data/order-data';
import { CreateOrder } from '../data/create-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: BackEndService) { }

  createOrder(data: CreateOrder, callback: any) {
    this.http.post('orders/create', data)
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      });
  }

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
    this.http.post('orders/delete', data)
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      });
  }
}
