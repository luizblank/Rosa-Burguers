import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../server/services/product.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-totem',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './totem.component.html',
  styleUrl: './totem.component.css'
})
export class TotemComponent implements OnInit{
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private product: ProductService
  ){}
  
  pedidos:any = [];

  produtos : any;
  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    await this.product.getProducts((result:any) => {
      console.log(result)
      this.produtos = result;
    });
  }

  capitalizeText(text: string)
  {
    var textSplitted = text.split(' ');
    var newText = textSplitted[0].slice(1);

    if (textSplitted.length <= 1)
    {
      newText = text.charAt(0).toUpperCase() + newText;
      return newText;
    }

    text = text.slice(textSplitted[0].length);
    newText = textSplitted[0].charAt(0).toUpperCase() + newText;
    newText = newText + text;
    return newText;
  }

  setPedido(item: any) {
    this.pedidos.push(item);
  }

  getTotalValue() {
    var totalValue = 0.00;
    if (this.pedidos.length > 0)
    {
      for (var i = 0; i < this.pedidos.length; i++)
      {
        totalValue += this.pedidos[i].preco;
      }
    }
    return totalValue.toFixed(2);
  }

  openDialog() {
    this.dialog.open(OrdersModal, {
      data: {
        order: this.pedidos,
        price: this.getTotalValue()
      }
    });
  }
}

@Component({
  selector: 'orders-modal',
  templateUrl: 'modal.html',
  styleUrl: './totem.component.css',
  imports: [
    NavBarComponent,
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  standalone: true,
})
export class OrdersModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { order: any, price: any }) { }
  
  selected = 'money';

  capitalizeText(text: string)
  {
    var textSplitted = text.split(' ');
    var newText = textSplitted[0].slice(1);

    if (textSplitted.length <= 1)
    {
      newText = text.charAt(0).toUpperCase() + newText;
      return newText;
    }

    text = text.slice(textSplitted[0].length);
    newText = textSplitted[0].charAt(0).toUpperCase() + newText;
    newText = newText + text;
    return newText;
  }
}