import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor( private settingsService : SettingsService,
               private sideBarService: SidebarService) { }

  ngOnInit(): void {
     //esta es la funcion que creamos en el TODO:assets/js/custom.jsTODO: para disparar de nuevo el JQuery
     //angular no nos reconoce esta funcion por lo que tenemos que usar el TODO:Declare
    customInitFunctions();
    this.sideBarService.cargarMenu();
    console.log(this.sideBarService.menu)
  }

  

}
