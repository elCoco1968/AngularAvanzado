import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {



  constructor( private usuarioService : UsuarioService, private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      //como ya realizamos la funcion nos va a devolver un true o false no necesitamos devolver mas ni subcripciones
      return this.usuarioService.validarToken()
          .pipe(
            tap( estaAutenticado => {
              if (!estaAutenticado) {
                this.router.navigateByUrl('/login');
              }
            })
          )

      //este bloque es como si estuviera comentado
      //con esto nos valida el token
      this.usuarioService.validarToken().subscribe( resp => {
        console.log(resp)
      })
      console.log('paso por el canActivate')
    //si retornamos falso no dejara que nadie ingrese a las rutas protegidas
    return false;
  }
  
}
