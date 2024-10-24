import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login2',
    pathMatch: 'full'
  },
  {
    path: 'segundo-home',
    loadChildren: () => import('./segundo-home/segundo-home.module').then(m => m.SegundoHomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home3',
    loadChildren: () => import('./home3/home3.module').then(m => m.Home3PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home4',
    loadChildren: () => import('./home4/home4.module').then(m => m.Home4PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then(m => m.Login2PageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'animation',
    loadChildren: () => import('./animation/animation.module').then(m => m.AnimationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deportes',
    loadChildren: () => import('./deportes/deportes.module').then(m => m.DeportesPageModule)
  },
  {
    path: 'cine',
    loadChildren: () => import('./cine/cine.module').then(m => m.CinePageModule)
  },
  {
    path: 'internacional',
    loadChildren: () => import('./internacional/internacional.module').then(m => m.InternacionalPageModule)
  },
  {
    path: 'ionic-storage-module',
    loadChildren: () => import('./ionic-storage-module/ionic-storage-module.module').then(m => m.IonicStorageModulePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'data',
    loadChildren: () => import('./data/data.module').then( m => m.DataPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
