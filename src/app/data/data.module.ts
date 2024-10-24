import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { DataPageRoutingModule } from './data-routing.module';
import { DataPage } from './data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Aquí añadimos ReactiveFormsModule
    IonicModule,
    DataPageRoutingModule
  ],
  declarations: [DataPage]
})
export class DataPageModule {}
