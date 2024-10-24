import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternacionalPage } from './internacional.page';

const routes: Routes = [
  {
    path: '',
    component: InternacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternacionalPageRoutingModule {}
