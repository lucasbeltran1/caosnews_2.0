import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importamos el servicio de autenticación

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {
  loginForm: FormGroup; // El formulario reactivo para login
  isLoading = false; // Indicador de carga para mostrar feedback al usuario

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService // Servicio de autenticación
  ) {
    // Inicializamos el formulario con validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validar que el email sea requerido y válido
      password: ['', Validators.required] // Validar que la contraseña sea requerida
    });
  }

  // Método que se llama cuando el usuario intenta iniciar sesión
  async onLogin() {
    if (this.loginForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete el formulario correctamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    this.isLoading = true; // Comienza la carga

    try {
      const { email, password } = this.loginForm.value; // Extraer valores del formulario

      console.log('Intentando login con', email, password);

      // Autenticar usando el servicio de autenticación
      const isAuthenticated = await this.authService.login(email, password);

      console.log('Resultado de isAuthenticated:', isAuthenticated);

      if (isAuthenticated) {
        // Si las credenciales son correctas, redirige al usuario a la página de inicio
        const user = this.authService.getCurrentUser();
        console.log('Usuario autenticado:', user);

        const toast = await this.toastController.create({
          message: `Bienvenido, ${user}!`,
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // Redirige al usuario autenticado a la página de inicio
        this.router.navigate(['/home']);
      } else {
        // Si las credenciales son incorrectas, muestra un mensaje de error
        const toast = await this.toastController.create({
          message: 'Usuario o contraseña incorrectos.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    } catch (error) {
      console.error('Error durante el login:', error);

      const toast = await this.toastController.create({
        message: 'Hubo un error al intentar iniciar sesión. Inténtelo nuevamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    } finally {
      this.isLoading = false; // Finaliza la carga
    }
  }

  // Método para cerrar sesión
  async logout() {
    this.authService.logout(); // Llamamos al servicio para cerrar sesión
    const toast = await this.toastController.create({
      message: 'Sesión cerrada con éxito.',
      duration: 2000,
      color: 'warning'
    });
    await toast.present();

    this.router.navigate(['/login2']); // Redirige al login después de cerrar sesión
    this.loginForm.reset(); // Limpia el formulario
  }
}
