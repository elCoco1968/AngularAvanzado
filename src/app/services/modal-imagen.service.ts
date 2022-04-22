import { Injectable,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  //el guion bajo es un standard para propiedades privadas
  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios'|'medicos'|'hospitales';
  public id?: string;
  public img?: string = 'no-img';

  //TODO: EVENTEMITTER TODO: Para que notifique que hubi un cambio de imagen
  public nuevaImagen: EventEmitter<string>= new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal
  }

  //funcion para que cuando ingresemos al modal obtenga la imagen
  abrirModal( tipo: 'usuarios'|'medicos'|'hospitales',
              id: string,
              img?:string)
  {
    this._ocultarModal= false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;
    //Ruta localhost.....

    //si la imagen viene de google e incluye https
    if(img?.includes('https')){
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }

  }

  cerrarModal(){
    this._ocultarModal= true;
  }


  constructor() { }
}
