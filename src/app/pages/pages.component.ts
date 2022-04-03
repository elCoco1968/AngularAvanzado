import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor( private settingsService : SettingsService) { }

  ngOnInit(): void {
     //esta es la funcion que creamos en el assets/js/custom.js para disparar de nuevo el JQuery
     //angular no nos reconoce esta funcion por lo que tenemos que usar el TODO:Declare
    customInitFunctions();
  }

  

}
