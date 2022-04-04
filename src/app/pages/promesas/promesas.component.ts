import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })

    // //Creando promesa
    // const promesa = new Promise((resolve,reject) =>{

    //   //si no manejamos el error nos saldra un ERROR Error
    //   //para manejarlo utilizamos el .catch
    //   if(true){
    //     resolve('Hola mundo')
    //   } else {
    //     reject('algo salio mal')
    //   }
    // });

    // promesa
    // .then((mensaje) => {
    //   console.log(mensaje)
    // })
    // //Asi manejamos los errores en las promesas el error seria igual al reject
    // .catch(error => console.log('error en mi promesa', error))


  }
  //Las promesas se usan caundo vayamos a hacer algo a destiempo, o despues de que algo suceda
  //o cuando algun procedimiento termine

  // getUsuarios(){
  //   //retorna una promesa de tipo response
  //   fetch('https://reqres.in/api/users')
  //   //toca procesarlo para decirle que necesitamos extraer el body
  //   .then((response) => {
  //     response.json().then( body => console.log(body))

  //   })
  // }

   getUsuarios(){

    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      //me retorna otra promesa
      .then( resp => resp.json())
      //Asi estamos obteniendo la data
      .then( body => resolve(body.data))
    });

    return promesa

    //TODO: Forma abreviada
    // return new Promise(resolve => {
    //   fetch('https://reqres.in/api/users')
    //   //me retorna otra promesa
    //   .then( resp => resp.json())
    //   //Asi estamos obteniendo la data
    //   .then( body => resolve(body.data))
    // });

  }

}
