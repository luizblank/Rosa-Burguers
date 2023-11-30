import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RippleRef } from '@angular/material/core';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
export class LoginComponent {
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
        sessionStorage.setItem('jwt', JSON.stringify(result))
        this.router.navigate(['']);
      }
    })
  }
}
