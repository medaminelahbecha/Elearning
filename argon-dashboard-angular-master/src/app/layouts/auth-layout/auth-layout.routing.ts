import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LoginEnseignantComponent } from '../../pages/login-enseignant/login-enseignant.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'loginEnseignant',       component: LoginEnseignantComponent }
];
