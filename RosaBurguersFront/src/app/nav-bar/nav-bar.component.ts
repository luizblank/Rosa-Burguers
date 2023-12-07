import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, Router } from '@angular/router';
import { ClientService } from '../server/services/client-service.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{
  constructor(
    private router: Router,
    private client: ClientService
  ) { }
  @Input() admLogin: Boolean = false;

  goToLogin() {
    this.router.navigate(['']);
  }

  goToOrders() {
    this.router.navigate(['adm/orders']);
  }

  goToTotem() {
    this.router.navigate(['adm/totem']);
  }

  goToProdutos() {
    this.router.navigate(['adm/products'])
  }
}
