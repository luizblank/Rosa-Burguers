import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { yourGuardGuard } from './your-guard.guard';
import { TotemComponent } from './totem/totem.component';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent,
        canActivate: [yourGuardGuard]
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [yourGuardGuard]
    },
    {
        path: 'adm',
        children: [
            { path: 'orders', component: OrdersComponent },
            { path: 'totem', component: TotemComponent }
        ]
    },
    {
        path: 'user',
        children: [
            { path: '', component: UserComponent }
        ], 
    }
];
