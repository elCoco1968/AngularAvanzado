import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const routes: Routes = [
  //Rutas hijas
  {
    //Tener en cuenta, la ruta padre en este caso es dashboard, los hijos dependen de ella, entonces se concatenaran a su extension
    path: 'dashboard',
    component: PagesComponent,
    //con children creamos las rutas hijas a partir de un componente padre
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
    ]
  },
];


@NgModule({
  //forchild nos indica que son rutas hijas
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
