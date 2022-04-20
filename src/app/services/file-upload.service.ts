import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';



const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id?: string
  ) {

    try {

      //url configurado en el backend
      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      //para configurar la data que vamos a mandar
      const formData = new FormData();
      //esto es lo que le vamos a mandar a nuestra peticion, en el caso de nosotros
      //solo tenemos que mandar una imagen, pero si tuvieramos que mandar mas cosas
      //las poniamos con el append
      formData.append('imagen', archivo)

      //el fetch nos permite hacer peticiones a una URL de manera snecilla
      //el fect es propio de angular
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        //indicamos lo que vamos a mandar en el body
        body: formData
      });


      const data = await resp.json();


      if ( data.ok ){
       
        return data.nombreArchivo
        
      } else {
       
        return false;
      }

    } catch (error){

      console.log(error);
      return false
    }

  }

}
