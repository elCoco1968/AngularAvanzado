import { Component, Input,  Output,EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{


  //para que cuando empiece el componente inicialice con la clase btn
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }


  //decimos que este valor lo vamos a TODO: Recibir
  //ya siendo un imút lo podemos llamar con [progreso]="variable a enviar" desde el tag del componente
  //Dentro de los ('') lo podemos renombrar y ya lo tendiramos que llamar asi desde el componente hijo
  @Input('valor') progreso : number = 40;
  //para añadir una clase desde el componente padre lo hacemos con un input asi
  @Input() btnClass: string = 'bg-primary'

  //los outputs son de tipo eventEmitter, es decir una funcion que el padre puede ejecutar, cuando lo llame mi componente va a disparar el evento
  //el event emitter debe saber que tipo de informacion va en el, tiparlo <number>
  //si lo dejamos asi va a tener un nulo, entonces lo tenemos que inicializar, podemos tiparlo tambien
  //pero como ya lo tipamos anteriormente no es necesario
  //  @Output() valorSalida: EventEmitter<number> = new EventEmitter<number>();
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();


  //generamos un getter para no tener un codigo extraño en la parte de nuestro HTML
  //tener un getter es como una variable
  // get getPorcentaje(){
  //   return `${ this.progreso}%`
  // }


  cambiarValor(valor : number){

    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progreso = 100;
    }

    if(this.progreso <= 0 && valor <= 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
    }
    
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
   
  }

  onChange(nuevoValor : number ){
    if(nuevoValor >= 100){
      this.progreso = 100;
    } else if(nuevoValor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
     this.valorSalida.emit(this.progreso);
  }

}
