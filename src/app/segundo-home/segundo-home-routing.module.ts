import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegundoHomePage } from './segundo-home.page';

const routes: Routes = [
  {
    path: '',
    component: SegundoHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegundoHomePageRoutingModule {}
