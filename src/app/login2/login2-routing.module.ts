import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login2Page } from './login2.page';

const routes: Routes = [
  {
    path: '',
    component: Login2Page
  },
  {
    path: 'forgot-password', // Ruta secundaria para la recuperación de contraseña
    loadChildren: () => import('../forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) // Asegúrate que ForgotPasswordPageModule sea el nombre correcto
  },
  {
    path: 'register', // Ruta secundaria para el registro
    loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule) // Asegúrate que RegisterPageModule sea el nombre correcto
  },
  {
    path: '**',
    redirectTo: '', // Redirige a la página principal si la ruta no es válida
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login2PageRoutingModule {}

