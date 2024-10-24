import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Home4PageRoutingModule } from './home4-routing.module';
import { Home4Page } from './home4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home4PageRoutingModule
  ],
  declarations: [Home4Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esto
})
export class Home4PageModule {}
