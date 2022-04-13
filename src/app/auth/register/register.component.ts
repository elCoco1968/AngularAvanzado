import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public formSubmitted = false;
  
  constructor(private fb: FormBuilder) { }



  public registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['147', Validators.required],
      password2: ['144', Validators.required],
      terminos: [false, Validators.required],
  },{
    //validacion personalizada
    Validators: this.passwordsIguales('password', 'password2')

  })

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value)
    const terminos = this.registerForm.get('terminos')

    if( this.registerForm.valid && this.aceptaTerminos){
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto...')
    }
  }

  campoNoValido( campo: string): boolean{

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(){
  return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  contrasenasNoValidas(){


    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else
      return false
  }


  //validacion de formulario
  passwordsIguales(pass1: string, pass2: string){

    //necesitamos retornar una funcion
    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual : true})
      }
    }



  }
 
}
