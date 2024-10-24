import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MatCardModule } from '@angular/material/card';
import { HomePageRoutingModule } from './home-routing.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; // Importar Geolocation

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatCardModule
  ],
  declarations: [HomePage],
  providers: [
    Geolocation // Añadido como proveedor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadido para manejar los componentes de Ionic
})
export class HomePageModule {}
