import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

//Anadirle un paso adicional a nuestro subscrpibe u observable
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})


//recbir peticiones HTTP
export class UsuarioService {

  public usuario?: Usuario;


  constructor(private http: HttpClient, private router:Router) { }


  //funcion para cerrar seccion
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario?.uid || '';
  }

  // de esta manera validaremos el token
  validarToken(): Observable<boolean>{
    // const token = localStorage.getItem('token') || '';
    //indicamos que en los headers vamos a mandar el token
    //con el mismo nombre que lo indicamos en nuestro backend, de la misma manera
    return this.http.get(`${ base_url}/login/renew`, {
      headers: {
        'x-token' : this.token
      }
    }).pipe(
      map((resp : any ) =>{
        console.log(resp);

        //extraemos los datos del usuario de la respuesta
        //Tener en cuenta que para poder acceder a los metodos debemos instancia la clase,
        //de lo contrario no vamos a poder acceder a sus metodos
        const {
          email,
          google,
          name,
          role,
          uid,
          img
        } = resp.usuario
        this.usuario = new Usuario( name,email, '',img ,uid , role, google);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      //obtenemos el token por medio de tap pero necesitamos trasnformarlo en boolean por medio de map
      //map( resp => true),
      //catchError atrapa el error y con of devuelve un nuevo observable con el valor de false
      catchError( error =>  of(false)) 
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




  actualizarPerfil( data: { email: string, nombre: string, role?: string}){
    data = {
      ...data,
      role: this.usuario?.role
    }

    console.log(this.usuario?.google)
    
    
    return this.http.put(`${base_url}/usuarios/${this.usuario?.uid}`,data, { headers:{'x-token': this.token}})
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
