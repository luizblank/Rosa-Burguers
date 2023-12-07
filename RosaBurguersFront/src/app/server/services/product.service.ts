import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';
import { ProductData } from '../data/product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: BackEndService) { }

  createProduct(data: ProductData, callback: any) {
    this.http.post('product/create', data)
        .subscribe(response => {
            callback(response);
        },
        error => {
            callback(error);
        });
  }
  
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