import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'adm',
        children: [
            { path: 'orders', component: OrdersComponent }
        ],
    },
    {
        path: 'user',
        children: [
            { path: '', component: UserComponent }
        ], 
    }
];
