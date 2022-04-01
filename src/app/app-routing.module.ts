import { NgModule } from '@angular/core';
//el commonModule ofrece las directivas,ngForm, ngIf etc
// import { CommonModule } from '@angular/common';
//El router para poder movernos entre rutas
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
//configuramos las rutas de nuestra aplicacion
//luego de configurar las rutas debemos importarlas en el imports

const routes: Routes = [
  //path: 'dashboard' PagesRouting
  //path: 'auth' AuthRouting
  //Ruta que sea errada que no sea ninguna de las que estamos declarando
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent}
];


@NgModule({
  declarations: [],
  //importamos las rutas y utilizamos el forRoot por que son rutas principales
  imports: [
    RouterModule.forRoot(routes),
    //TODO: aca importamos nuestro routing realizado en las pages
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
//TODO: Tenemos que decirle a nuestra app que disponga de este modulo entonces
//lo debemos de exportar en el FIXME:app.module.ts