import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  name = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.min(16)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Você deve digitar seu nome' : '';
  }

  getSexErrorMessage() {
    return this.name.hasError('required') ? 'Selecione seu sexo' : '';
  }

  getAgeErrorMessage() {
    if (this.age.hasError('required')) {
      return 'Você deve digitar sua idade';
    }

    return this.age.hasError('min') ? 'Apenas maiores de 16 anos' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve digitar seu email';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }
}
