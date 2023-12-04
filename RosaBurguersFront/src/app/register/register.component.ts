import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../server/services/client-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private client: ClientService
  ) { }

  hide = true;

  name = new FormControl('', [Validators.required]);
  sex = new FormControl('', [Validators.required]);
  birthDate = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Você deve digitar seu nome' : '';
  }

  getSexErrorMessage() {
    return this.sex.hasError('required') ? 'Selecione seu sexo' : '';
  }

  getDateBirthErrorMessage() {
    return this.birthDate.hasError('required') ? 'Selecione sua data de nascimento' : '';
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
    if (this.name.value == null || this.birthDate.value == null ||
      this.sex.value == null || this.email.value == null ||
      this.password.value == null) {
      return;
    }

    var response = this.client.register({
      name: this.name.value,
      birthDate: (new Date(this.birthDate.value)).toISOString().substring(0, 10),
      sex: this.sex.value,
      email: this.email.value,
      password: this.password.value
    }, (result: any) => {
      if (result == true)
      {
        alert('Cadastro feito com sucesso!');
        this.router.navigate(['login']);
      }
      else
      {
        alert(result.error[0]);
      }
    })
  }
}
