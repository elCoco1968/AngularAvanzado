import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit , OnDestroy{

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public medicosTemp: Medico[] = [];

  private imgSubs?: Subscription;

  constructor(private medicosService: MedicosService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }



  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe(img => this.cargarMedicos())

  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    return this.medicosService.cargarMedicos().
      subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      })
  }


  borrarMedico(medico: Medico) {

    Swal.fire({
      title: 'Borrar Hospital?',
      text: `Esta a punto de borrar a ${medico.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosService.borrarMedico(medico._id!)
          .subscribe(resp => {

            this.cargarMedicos();
            Swal.fire(
              'Eliminado!',
              `${medico.name} Eliminado correctamente`,
              'success'
            );
          })

      }
    })
  }

  //Abrir modal y mandar parametros para obtener imagen
  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino : string): any{
    if (termino.length === 0 ) {
      return this.medicos = this.medicosTemp;
    }

    this.busquedasService.buscar('medicos',termino)
        .subscribe( resp => {
          this.medicos = resp
        })
  }


}
