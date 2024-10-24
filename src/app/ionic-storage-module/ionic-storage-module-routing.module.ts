import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModulePage } from './ionic-storage-module.page';

const routes: Routes = [
  {
    path: '',
    component: IonicStorageModulePage, // Asegúrate de que el componente esté referenciado correctamente
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicStorageModulePageRoutingModule {}
