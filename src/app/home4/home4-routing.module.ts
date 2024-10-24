import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home4Page } from './home4.page';

const routes: Routes = [
  {
    path: '',
    component: Home4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Home4PageRoutingModule {}
