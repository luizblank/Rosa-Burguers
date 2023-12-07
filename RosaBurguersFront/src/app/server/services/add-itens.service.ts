import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { addItensData } from '../data/add-itens';

@Injectable({
  providedIn: 'root'
})
export class OrderItens {
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
