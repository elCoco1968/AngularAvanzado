import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  //aca vamos a almacenar la imagen, nos dirigimos al HTML al input y le damos elmetodo CHANGE
  public imagenSubir!: File;
  public imagenTemp : any ;

  constructor( public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  
  //logica para cambiar la imagen
  cambiarImagen(file : any): any{
    if (file?.target?.files[0]) {
      
      this.imagenSubir =file.target.files[0];

      if(!this.imagenSubir){
        return this.imagenTemp = '';
      }
      // this.disabled = false;

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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo,id)
    //Muy importante el simbolo TODO:!!!!!!!!!!!
    .then( img => {
    
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success')

      //vamos a emitirle a nuestro modalService la img que agregamos
      this.modalImagenService.nuevaImagen.emit(img)

      this.cerrarModal();
    }).catch( err => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

}
