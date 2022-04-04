import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent { 

  public titulo ?: string;

    //Utilizamos el router por que estamos enviando parametros por las rutas
   constructor(private router:Router) {
    this.getArgumentosRuta();
   }


   getArgumentosRuta(){
    //el events es un observable que emite eventos,
    //hasta este momento nos emite muchos datos pero queremos solo obtener la data entonces empezamos a hacer los filtros
    this.router.events
    .pipe(
         //con este filtrado ya solo obtenemos dos Activations
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)
      //extraer la propiedad titulo
    ).subscribe( ({titulo}) => {
      this.titulo = titulo
      document.title = `AdminPro-${titulo}`
    });
   }

}
