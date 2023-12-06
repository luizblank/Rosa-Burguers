import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: BackEndService) { }

  getProducts(callback: any) {
    return this.http.get('product/products')
        .subscribe(response => {
            callback(response);
        },
        error => {
            callback(error);
        });
  }
}