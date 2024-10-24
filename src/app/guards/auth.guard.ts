import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que esta ruta es correcta

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login2']);
      return false;
    }
    return true; // Permite la navegación si está autenticado
  }
}
