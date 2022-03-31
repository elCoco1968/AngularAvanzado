import { NgModule } from '@angular/core';
//el commonModule ofrece las directivas,ngForm, ngIf etc
// import { CommonModule } from '@angular/common';
//El router para poder movernos entre rutas
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

//configuramos las rutas de nuestra aplicacion
//luego de configurar las rutas debemos importarlas en el imports

const routes: Routes = [
  //Rutas hijas
  { 
    path: '', 
    component:PagesComponent,
    //con children creamos las rutas hijas a partir de un componente padre
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent },
      {path: 'grafica1', component: Grafica1Component },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
 

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  //Ruta innexistente nos redirige al dashboard
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //Ruta que sea errada que no sea ninguna de las que estamos declarando
  {path: '**', component: NopagefoundComponent}
];



@NgModule({
  declarations: [],
  //importamos las rutas y utilizamos el forRoot por que son rutas principales
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
//TODO: Tenemos que decirle a nuestra app que disponga de este modulo entonces
//lo debemos de exportar en el FIXME:app.module.ts