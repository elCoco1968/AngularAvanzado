import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {



  public menu = [];

  //cargamos el menu pero como el devuelve un string lo debemos parsear con JSON.PARSE
  //indicamos que por ninguna razon vendra nulo
  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!);
  }

  // menu: any[] = [
  //   {
  //     //generamos el menu de manera dinamica
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Graficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'rxjs', url: 'rxjs' },
  //     ]
  //   },

  //   {
  //     //generamos el menu de manera dinamica
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' }
  //     ]
  //   },
  // ]


  constructor() { }
}
