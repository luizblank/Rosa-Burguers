import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ClientServiceService } from '../server/services/client-service.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(
    private router: Router,
    private client: ClientServiceService
  ) { }

  hide = true;
  email = '';
  password = '';

  goToCadastro() {
    this.router.navigate(['register'])
  }

  logar()
  {
    if (this.email == null || this.password == null) {
      return;
    }

    this.client.login({
      email: this.email,
      password: this.password
    }, (result: any) => {
      if (result == null)
      {
        alert('Senha ou usuário incorreto!')
      }
      else
      {
        sessionStorage.setItem('jwt', JSON.stringify({'value': result.jwt}))
        if (result.adm)
        {
          this.router.navigate(['adm/orders']);
          return;
        }

        this.router.navigate(['user']);
      }
    })
  }
}
