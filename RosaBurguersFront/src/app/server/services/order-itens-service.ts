import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { addItensData } from '../data/add-itens';
import { CreateOrder } from '../data/create-order';

@Injectable({
  providedIn: 'root'
})
export class OrderItensService {
  constructor(private http: BackEndService) { }

  addItens(data: addItensData, callback: any) {
    this.http.post('orderItens/add', data)
      .subscribe(response => {
        callback(response);
      },
      error => {
        callback(error);
      });
  }
}
