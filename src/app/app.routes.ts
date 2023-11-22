import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent }
];
