import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false; // Variable para manejar el estado de autenticación
  private currentUser: string | null = null; // Guarda el correo del usuario autenticado

  constructor() {
    this.loadFromLocalStorage(); // Cargar el estado de autenticación y el usuario actual desde localStorage
  }

  // Cargar la autenticación y usuario desde localStorage
  private loadFromLocalStorage(): void {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated = !!token; // Si existe el token, el usuario está autenticado
    this.currentUser = localStorage.getItem('currentUser'); // Cargar el usuario actual
  }

  // Guardar el estado de autenticación y usuario en localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('authToken', 'dummyToken');
    if (this.currentUser) {
      localStorage.setItem('currentUser', this.currentUser);
    }
  }

  // Método para registrar usuarios
  register(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      
      // Verificar si el correo ya está registrado
      if (registeredUsers[email]) {
        resolve(false); // Usuario ya existe
      } else {
        // Registrar el nuevo usuario
        registeredUsers[email] = { password };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        resolve(true); // Usuario registrado con éxito
      }
    });
  }

  // Método para autenticar usuarios
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      
      // Verifica si el usuario está registrado y la contraseña es correcta
      if (registeredUsers[email] && registeredUsers[email].password === password) {
        this.isAuthenticated = true;
        this.currentUser = email;
        this.saveToLocalStorage(); // Guardar el estado autenticado y usuario
        resolve(true); // Credenciales correctas
      } else {
        this.isAuthenticated = false;
        resolve(false); // Credenciales incorrectas
      }
    });
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Método para obtener el usuario autenticado actual
  getCurrentUser(): string | null {
    return this.currentUser;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  // Método para eliminar un usuario registrado (opcional)
  deleteUser(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      
      if (registeredUsers[email]) {
        delete registeredUsers[email];
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        resolve(true); // Usuario eliminado con éxito
      } else {
        resolve(false); // Usuario no encontrado
      }
    });
  }
}
