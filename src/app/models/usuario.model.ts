import { environment } from "src/environments/environment";


const base_url = environment.base_url;


export class Usuario {

    constructor(
        
        public name: string,
        public email: string,
        public password?: string,
        public  img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string
    ){}


    //Obtener la url de la imagen del usuario logeado
    get imagenUrl(){
        ///upload/usuario/no-image

        if(!this.img){
            return `${base_url}/upload/usuarios/no-imagen`;
        } else  if( this.img?.includes('https')){
            return this.img
        } else  if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`
        } else {
            return `${base_url}/upload/usuarios/no-imagen`;
        }

       

       
    }
}