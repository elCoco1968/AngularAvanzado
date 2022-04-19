import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  //public perfilForm: FormGroup;

  myForm: FormGroup = this.fb.group({
    name: ['123', Validators.required],
    email: ['456', Validators.required],
  });

  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService) {
   
   }

  ngOnInit(): void {
   
  }

  actualizarPerfil(){
    console.log(this.myForm.value);
    this.usuarioService.actualizarPerfil( this.myForm.value)
          .subscribe( resp => {
            
          })
  }

}
