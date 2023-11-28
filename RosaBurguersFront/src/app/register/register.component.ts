import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ClientServiceService } from '../client-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private client: ClientServiceService
    ) {}

  hide = true;

  name = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);
  dateBirth = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Você deve digitar seu nome' : '';
  }

  getSexErrorMessage() {
    return this.sex.hasError('required') ? 'Selecione seu sexo' : '';
  }

  getDateBirthErrorMessage() {
    return this.dateBirth.hasError('required') ? 'Selecione sua data de nascimento' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve digitar seu email';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Digite sua senha' : '';
  }

  register() {
    if(this.name.value == null || this.dateBirth.value == null || 
      this.sex.value == null || this.email.value == null || 
      this.password.value == null)
    {
      return;
    }
    console.log(new Date(this.dateBirth.value).toLocaleDateString())
    this.client.register({
      name: this.name.value,
      dateBirth: new Date(this.dateBirth.value),
      sex: this.sex.value,
      email: this.email.value,
      password: this.password.value
    })
  }
}
