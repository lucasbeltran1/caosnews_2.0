import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular'; // Asegúrate de tener esta importación
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup; // Almacena el formulario reactivo
  passwordMismatch = false; // Verifica si las contraseñas coinciden
  passwordHasLetter = true; // Verifica si la contraseña tiene al menos una letra

  // Constructor del componente, donde se inyectan las dependencias necesarias
  constructor(
    private formBuilder: FormBuilder, 
    private toastController: ToastController, // Inyecta ToastController correctamente
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {
    // Inicialización del formulario con validaciones
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required], // El nombre es obligatorio
      email: ['', [Validators.required, Validators.email]], // El correo debe ser válido
      password: ['', [Validators.required, Validators.minLength(6), this.containsLetter]], // La contraseña debe tener al menos 6 caracteres y contener una letra
      confirmPassword: [''] // Campo para confirmar la contraseña
    });

    // Cada vez que el formulario cambie, se verifica si las contraseñas coinciden y si la contraseña contiene letras
    this.registerForm.valueChanges.subscribe(() => {
      const password = this.registerForm.get('password')?.value || ''; // Obtener el valor del campo de contraseña
      const confirmPassword = this.registerForm.get('confirmPassword')?.value || ''; // Obtener el valor del campo de confirmación de contraseña
      this.passwordMismatch = password !== confirmPassword; // Verifica si las contraseñas coinciden
      this.passwordHasLetter = this.containsLetter(this.registerForm.get('password')) === null; // Verifica si la contraseña contiene al menos una letra
    });
  }

  // Función que verifica si la contraseña contiene letras
  containsLetter(control: any) {
    const regex = /[a-zA-Z]/; // Expresión regular para detectar letras
    return regex.test(control?.value || '') ? null : { noLetter: true }; // Retorna 'null' si la contraseña contiene letras, de lo contrario devuelve un error
  }

  // Función que se llama al enviar el formulario
  async onRegister() {
    if (this.registerForm.valid && !this.passwordMismatch) { // Si el formulario es válido y las contraseñas coinciden
      const { email, password } = this.registerForm.value;

      const isRegistered = await this.authService.register(email, password);

      if (isRegistered) {
        // Mostrar un toast de éxito
        const toast = await this.toastController.create({
          message: 'Registro exitoso', // Mensaje a mostrar en el toast
          duration: 2000, // Duración del toast en milisegundos
          color: 'success' // Color verde para indicar éxito
        });
        await toast.present(); // Mostrar el toast
      } else {
        // Mostrar un toast de error si el usuario ya está registrado
        const toast = await this.toastController.create({
          message: 'El usuario ya está registrado',
          duration: 2000, // Duración del toast en milisegundos
          color: 'danger' // Color rojo para indicar error
        });
        await toast.present(); // Mostrar el toast
      }
    }
  }
}
