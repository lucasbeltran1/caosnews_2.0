import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importaciones de Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment'; // Importa el archivo de configuración

import { HttpClientModule } from '@angular/common/http';

// Importaciones para la configuración de fechas en español
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar el idioma español
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Inicializa Firebase con los módulos que necesitas
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa AngularFire
    AngularFirestoreModule,  // Habilita Firestore
    AngularFireStorageModule, // Habilita Storage para manejo de archivos
    HttpClientModule, // Configurar HTTPClient en Angular
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es' } // Establecer el idioma español
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Esquema para manejar elementos personalizados
})
export class AppModule {}
