import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegundoHomePageRoutingModule } from './segundo-home-routing.module';

import { SegundoHomePage } from './segundo-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegundoHomePageRoutingModule
  ],
  declarations: [SegundoHomePage]
})
export class SegundoHomePageModule {}
