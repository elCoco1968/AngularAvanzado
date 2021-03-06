import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicosUpdateComponent } from './mantenimientos/medicos/medicos-update.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  //Rutas hijas
  {
    //Tener en cuenta, la ruta padre en este caso es dashboard, los hijos dependen de ella, entonces se concatenaran a su extension
    path: 'dashboard',
    component: PagesComponent,
    //Implementando el guard canAcivate
    canActivate: [ AuthGuard],
    //con children creamos las rutas hijas a partir de un componente padre
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica 1'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'} },
      { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda'} },
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
      { path: 'myperfil', component: PerfilComponent , data: {titulo: 'Perfil Usuario'} },

      //Mantenimientos
      { path: 'hospitales', component: HospitalesComponent , data: {titulo: 'Hospitales de la aplicacion'} },
      { path: 'medicos', component: MedicosComponent , data: {titulo: 'Medicos de la aplicacion'} },
      { path: 'medico/:id', component: MedicosUpdateComponent , data: {titulo: 'Actualizar Medico'} },
      
      //Rutas ADMIN
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent , data: {titulo: 'Usuarios de aplicacion'} },
    ]
  },
];

@NgModule({
  //forchild nos indica que son rutas hijas
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
