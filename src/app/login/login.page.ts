import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; // Asegúrate de importar MenuController
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menuCtrl: MenuController, private router: Router) { } // Agrega el Router en el constructor

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }

  openSecondMenu() {
    this.menuCtrl.open('second-menu');
  }

  openEndMenu() {
    this.menuCtrl.open('end');
  }

  goToHome() {
    // Navega a la página de inicio
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    // Inicializa cualquier elemento necesario al cargar el componente
  }
}
