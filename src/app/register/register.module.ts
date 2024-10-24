import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule correctamente

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de que ReactiveFormsModule esté aquí para formularios reactivos
    IonicModule, // Importa IonicModule para usar los componentes de Ionic
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage],
  schemas: [] // Si persisten problemas con componentes desconocidos, considera agregar CUSTOM_ELEMENTS_SCHEMA aquí
})
export class RegisterPageModule {}
