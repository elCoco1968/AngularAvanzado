import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  //para realizar el filtro
  public usuariosTemp: Usuario[] = [];

  //para que se cierre el subscripcion de la imagen nueva
  public imgSubs?: Subscription;


  public desde: number = 0;
  public cargando: boolean = true;


  //Utilizamos el ngOnDestroy para que se destruya la subscripcion caudno salgamos de la pagina y no haya fugas de memoria
  constructor( private usuarioService : UsuarioService,
                private busquedasService: BusquedasService,
                private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    //Nos subscribimos al emiter o observable que cuando el notifique que hubo un cambio en las imagenes cargue los usuarios de nuevo,
    //obtuvimos un error el cual estaba cargando primero que llegara la imagen entonces no se mostraba lo solucionamos con un delay
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe
    (
      //con este delay es suficiente para quealcance a llegar la imagen
      delay(500)
    ).subscribe( img => {
      
      this.cargarUsuarios()
    });
  }
  
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
    
  }

  cambiarPagina( valor: number ){
    this.desde += valor;
    
    if(this.desde < 0){
      this.desde = 0;
      
    }else if (this.desde > this.totalUsuarios){
      this.desde -=valor;
    }
    this.cargarUsuarios();
  }


  //Cuadro de filtrado
  buscar(termino: string): any{
    //estamos haciendo el filtrado retorne una lista con los que habian antes cuando el filtro este vacio
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino)
        .subscribe( resp => {
          this.usuarios = resp
        })
  }

  eliminarUsuario( usuario: Usuario):any{


    //Validacion para no permitir que se elimine el mismo usuario
    if( usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }


    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
            .subscribe( resp => {
              
              this.cargarUsuarios();
              Swal.fire(
                'Eliminado!',
                `${usuario.name} Eliminado correctamente`,
                'success'
              );
            })

      }
    })

  }


  //actualizar role de usuarios
  cambiarRole( usuario: Usuario ){
    
    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp)
      });
  }


  //Abrir modal y mandar parametros para obtener imagen
  abrirModal( usuario : Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }



}
