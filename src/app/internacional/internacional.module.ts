import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternacionalPageRoutingModule } from './internacional-routing.module';

import { InternacionalPage } from './internacional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternacionalPageRoutingModule
  ],
  declarations: [InternacionalPage]
})
export class InternacionalPageModule {}
