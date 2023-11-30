import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor (private router: Router) {}
  session: any = sessionStorage.getItem('jwt'); // Se achar retorna uma string, se não retorna nulo
  admLogin: Boolean = true;
}
