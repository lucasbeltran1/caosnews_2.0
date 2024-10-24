import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CinePageRoutingModule } from './cine-routing.module';

import { CinePage } from './cine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CinePageRoutingModule
  ],
  declarations: [CinePage]
})
export class CinePageModule {}
