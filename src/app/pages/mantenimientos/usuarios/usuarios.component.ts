import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  //para realizar el filtro
  public usuariosTemp: Usuario[] = [];


  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuarioService : UsuarioService,
                private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
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

  eliminarUsuario( usuario: Usuario){

    console.log(usuario)

  }




}
