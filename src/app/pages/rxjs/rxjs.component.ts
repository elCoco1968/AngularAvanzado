import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs?: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
  
    //   retry(1)
    // )
    // .subscribe( 
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );

    //Asi lo hacemos de forma rapida
   this.intervalSubs = this.retornaIntervalo().subscribe( console.log);
    // this.retornaIntervalo().subscribe( (valor) => console.log(valor));
   }


   //cancelamos el subscribe en el momento que cambiamos de componente
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }


   //retornamos un observable
   retornaObservable(): Observable<number>{
    const obs$ = new Observable<number>( observer => {

      let i = -1;
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if( i === 4){
          clearInterval( intervalo )
          observer.complete();
        }
        if( i == 2){
          observer.error('I llego al valor de 2')
        }


      }, 1000)
    });

    return obs$
   }

   retornaIntervalo(): Observable<number>{
    const interval$ = interval(1000)
    .pipe(
      //Con el take le decimos que solo queremos que nos emita 4 valores
      //map sirve para recibir la informacion que trasmite el observable y mutarlo como necesitamos
      //recibe el valor o cada trasmision, como es una sola linea de return la podemos simplificar
      map( valor =>  valor + 1),
      //el filter trabajara con el valor del map, ya que todo se ejecuta en cadena, si es true lo dejara pasar si es falso no
      filter(valor => (valor % 2 === 0) ? true : false),
      take(10),
     
    );

    return interval$;

    //se puede simplificar retornando directamente
    // return interval(1000)
    // .pipe(
    //   //Con el take le decimos que solo queremos que nos emita 4 valores
    //   take(4),
    //    //map sirve para recibir la informacion que trasmite el observable y mutarlo como necesitamos
    //    //recibe el valor o cada trasmision, como es una sola linea de return la podemos simplificar
    //   map( valor =>  valor + 1)
     
    // );

   }
}
