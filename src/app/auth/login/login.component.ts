import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    //Si el usuario acepto ser recordado, sera recordado y obtendremos el email del localStorage, y si no hay nada un string vacio
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    //si quiere que recuerde la seccion
    remember: [false]

  });


  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }


  ngOnInit(): void {

  }


  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {

        //Cuando le demos a la opcion de que queremos ser recordados
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        } else {
          localStorage.removeItem('email')
        }
        //navegar al dashboard
        this.router.navigate(['/dashboard'])

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })

  }

 

}
