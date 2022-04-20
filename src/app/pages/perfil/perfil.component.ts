import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;

  public usuario?: Usuario;
  //aca vamos a almacenar la imagen, nos dirigimos al HTML al input y le damos elmetodo CHANGE
  public imagenSubir!: File;
  public imagenTemp : any ;

  public disabled: boolean = true;
  
  // myForm: FormGroup = this.fb.group({
    //   name: [ this.usuario?.name, Validators.required],
    //   email: [this.usuario?.email, Validators.required],
    // });
    
  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
      
      //Con esto ya tenemos a la mano toda la informacion del usuario
      this.usuario = usuarioService.usuario;
      
    }
    
    ngOnInit(): void {
      this.perfilForm = this.fb.group({
        name: [this.usuario?.name , Validators.required],
        email: [this.usuario?.email , [Validators.required, Validators.email]],
      })
  }


  actualizarPerfil(){
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil( this.perfilForm?.value)
          .subscribe( resp => {
            //asi nos actualiza el nombre, tambien se puede ahcer un observable que escuche los cambios
            const {name, email} = this.perfilForm.value;
            this.usuario!.name = name;
            this.usuario!.email = email;

            Swal.fire('Guardado', 'Cambios fueron guardados', 'success')


          }, (err) => {
            Swal.fire('Error', 'Error inesperado', 'error')
          });
  }


  //logica para cambiar la imagen
  cambiarImagen(file : any): any{
    if (file?.target?.files[0]) {
      
      this.imagenSubir =file.target.files[0];

      if(!this.imagenSubir){
        return this.imagenTemp = '';
      }
      this.disabled = false;

       const reader = new FileReader();
       reader.readAsDataURL(this.imagenSubir);

       //obtener la imagen que vamos a ingresar
       reader.onloadend = () => {
         this.imagenTemp = reader.result;
       
      }
    }


  }

  //logica para subir imagen cuando presionemos el boton
  subirImagen (){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario?.uid)
    //Muy importante el simbolo TODO:!!!!!!!!!!!
    .then( img => {
      this.usuario!.img = img;
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success')

    }).catch( err => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

  cancelarImagen(){
    this.imagenTemp = '';
    this.disabled = true;
  }
}
 