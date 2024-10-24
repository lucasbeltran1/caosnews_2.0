import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para trabajar con formularios
import { IonicModule } from '@ionic/angular'; // Para los componentes de Ionic

import { IonicStorageModulePageRoutingModule } from './ionic-storage-module-routing.module'; // Enrutamiento de la página
import { IonicStorageModulePage } from './ionic-storage-module.page'; // Componente de la página

// Importa los módulos de Firebase necesarios
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Módulo de Firebase Storage
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Módulo de Firestore

import { environment } from '../../environments/environment'; // Configuración de Firebase

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Necesario para formularios reactivos
    IonicModule,
    IonicStorageModulePageRoutingModule, // Enrutamiento del módulo
    // Inicializa Firebase con la configuración de tu proyecto
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, // Para el manejo de Firebase Storage
    AngularFirestoreModule, // Para el manejo de Firestore
  ],
  declarations: [IonicStorageModulePage]
})
export class IonicStorageModulePageModule {}
