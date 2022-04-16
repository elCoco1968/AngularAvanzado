import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

//Anadirle un paso adicional a nuestro subscrpibe u observable
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})


//recbir peticiones HTTP
export class UsuarioService {


  constructor(private http: HttpClient, private router:Router) { }


  //funcion para cerrar seccion
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }



  // de esta manera validaremos el token
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    //indicamos que en los headers vamos a mandar el token
    //con el mismo nombre que lo indicamos en nuestro backend, de la misma manera
    return this.http.get(`${ base_url}/login/renew`, {
      headers: {
        'x-token' : token
      }
    }).pipe(
      tap((resp : any ) =>{
        localStorage.setItem('token', resp.token)
      }),
      //obtenemos el token por medio de tap pero necesitamos trasnformarlo en boolean por medio de map
      map( resp => true),
      //catchError atrapa el error y con of devuelve un nuevo observable con el valor de false
      catchError( error => of(false)) 
    )
  }

  crearUsuario(formData: RegisterForm) {

    //retorna un observable, por lo que nos podemos subscribir a el sea aca o directamente en la creacion
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        //el tab siempre recibe la respuesta del servidor
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)

        })
      )
  }



  login(formData: loginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        //el tab siempre recibe la respuesta del servidor
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)

        })
      )
  }
}
