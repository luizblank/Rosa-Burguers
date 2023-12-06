import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../server/services/product.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(
    private product: ProductService
  ){}
  
  produtos : any;
  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    await this.product.getProducts((result:any) => {
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
}
