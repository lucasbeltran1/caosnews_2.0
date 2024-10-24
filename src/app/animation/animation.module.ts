import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AnimationPageRoutingModule } from './animation-routing.module';
import { AnimationPage } from './animation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimationPageRoutingModule
  ],
  declarations: [AnimationPage]
})
export class AnimationPageModule {}

