import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CinePage } from './cine.page';

const routes: Routes = [
  {
    path: '',
    component: CinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinePageRoutingModule {}
