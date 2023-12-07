import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../server/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor (
    private product: ProductService
  ) {}

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  size = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Você deve digitar seu nome' : '';
  }

  getPriceErrorMessage() {
    return this.price.hasError('required') ? 'Você deve digitar um valor' : '';
  }

  getTypeErrorMessage() {
    return this.type.hasError('required') ? 'Você deve selecionar um tipo' : '';
  }
  
  getSizeErrorMessage() {
    return this.size.hasError('required') ? 'Você deve selecionar um tamanho' : '';
  }

  getDescriptionErrorMessage() {
    return this.type.hasError('required') ? 'Você deve dar uma descrição' : '';
  }

  registerProduct() {
    if (
      this.name.value != null && 
      this.description.value != null && 
      this.type.value != null && 
      this.price.value != null && 
      this.size.value != null && 
      this.description.value != null
    )
    this.product.createProduct({
      name: this.name.value, 
      description: this.description.value,
      type: this.type.value,
      price: parseFloat(this.price.value),
      size: this.size.value
    }, (result:any) => {
      console.log(result);
      window.location.reload();
    })
  }
}
