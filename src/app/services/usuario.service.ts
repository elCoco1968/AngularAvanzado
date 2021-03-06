import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

//Anadirle un paso adicional a nuestro subscrpibe u observable
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuaros.interface';


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

    //TODO: Borrar menu

    this.router.navigateByUrl('/login');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario?.uid || '';
  }

  get role(): any{
    return this.usuario?.role;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
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
        this.usuario = new Usuario( name,email, '',img , google,role, uid);
        //localStorage.setItem('token', resp.token);
        //tambien vamos a grabar el menu acorde a su role
        //localStorage.setItem('menu', resp.menu);
        this.guardarLocalStorage( resp.token, resp.menu);
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
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      )
  }

  actualizarPerfil( data: { email: string, nombre: string, role?: string}){
     data = {
       ...data,
       role: this.usuario?.role
     }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data, { headers:{'x-token': this.token}})
  }

  login(formData: loginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        //el tab siempre recibe la respuesta del servidor
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('menu', JSON.stringify(resp.menu));
        })
      )
  }

  //cargar usuarios por medio de paginacion
  cargarUsuarios(desde : number = 0){

    const url = `${ base_url }/usuarios?desde=${desde}`
    //esta es la forma creando interfaz
    return this.http.get<CargarUsuario>( url , this.headers )
                    .pipe(
                      //delay que espere 5 segundos antes de emitir el valor
                      delay(500),
                      map( resp => {

                        const usuarios = resp.usuarios.map(
                           (user : any) => new Usuario(user.name, user.email, '', user.img, user.google, user.role, user.uid))


                        return{
                          total: resp.total,
                          usuarios
                        };
                      })
                    )
    //es otra forma, de indicarle que es lo que vamos a devolver, la otra opcion es realizar una interfaz
    //return this.http.get<{total: Number, usuarios:Usuario[]}>( url , this.headers );
  }

  eliminarUsuario(usuario: Usuario){

    //http://localhost:3000/api/usuarios/62524f84d7240cb1bcfe6275
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, {headers:{'x-token': this.token}})
  }


  //TODO: Este metodo no nos funciono toco implementarlo de forma aparte en el login que, me respondiera con el menu y el token
  guardarLocalStorage( token: string, menu : any){
    localStorage.setItem('token', token);
    //En el local storage no podemos grabar objetos, ni nada de eso,
    //solo podemos guardar strings para eso lo pasamos por el json.stringify
    //localStorage.setItem('menu', JSON.stringify("TEST"));
  }

  //TODO:  2 -> 55136679 - 1 -> 54608583  solo arl -> 55577193
  // Todo, arl salud y pension ->  55576873

  //guardar usuario actualizado (en este caso puntual actualizamos el rol)
  guardarUsuario( usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario, this.headers)
  }

  
}
