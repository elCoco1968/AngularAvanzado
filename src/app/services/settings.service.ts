import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //selector del indexHTML
  public linkTheme = document.querySelector('#theme');

  constructor() { 
    //ya con esto estamos yendo a la variable 'theme' en localStorage  y accediendo a su contenido y si esta vacio que nos ponga el 
      //otro tema por defacult     
      const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
      //con esyo estamos setteando al atibuto del selector href el tema guardado en el localStorage
      this.linkTheme?.setAttribute('href',url);

  }

  changeTheme(theme: string){
    //aca le mandamos la URL y obtenemos la ult modificada
    const url = `./assets/css/colors/${theme}.css`;
    //Con el setAttribute cambiamos el valor, del href y le ponemos la URL
    this.linkTheme?.setAttribute('href',url);
    //Con esto ya guardamos la url En el localStorage, ya solo falta tomarlo y aplicarlo
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  
  }  
  
  //Funcion para cambiar la clase working o check
  checkCurrentTheme(){
    //accedemos a todos los selectores de la clase para poder modificar cada uno
    const links = document.querySelectorAll('.selector');
    links.forEach(elemt => {
      //quitamos la casle working o del check a todas
      elemt.classList.remove('working');
      //accedemos al atributo de data-theme que esta en tdos nuestros selectores
      const btnTheme = elemt.getAttribute('data-theme');
      //accedemos a la url ya preestablecida para ya hacer la comparacion
      const btnThemeUrl =`./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elemt.classList.add('working')
      }

    })
  }

  

   
}
