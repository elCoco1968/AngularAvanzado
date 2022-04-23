import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;

  public hospitalesTemp: Hospital[] = [];

  constructor(private hospitalesServices: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(500))
        .subscribe( img => this.cargarHospitales())

  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalesServices.cargarHospitales().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    })
  }

  buscar(termino: string): any{

    if (termino.length === 0 ) {
      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedasService.buscar('hospitales',termino)
        .subscribe( resp => {
          this.hospitales = resp
        })
  }


  guardarCambios(hospital: Hospital) {
    this.hospitalesServices.actualizarHospital(hospital._id!, hospital.name)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.name, 'success')
      })
  }

  eliminarHospitales(hospital: Hospital) {


    Swal.fire({
      title: 'Borrar Hospital?',
      text: `Esta a punto de borrar a ${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalesServices.borrarHospital(hospital._id!)
          .subscribe(resp => {

            this.cargarHospitales();
            Swal.fire(
              'Eliminado!',
              `${hospital.name} Eliminado correctamente`,
              'success'
            );
          })

      }
    })


  }

  async abrirSweetAlert() {
    //para contar con la ayuda del tipado, vamos a abrir llaves y decir que eso trabaja con un string
    //con el value en un string vacio solucionamos el prrblema de que nos salia que no podia leer propiedades indefinidas
    //tener en cuenta eso ya que esun error muy comun TODO:
    const { value = ''} = await Swal.fire<string>({

      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value!.trim().length > 0) {
      this.hospitalesServices.crearHospital(value!)
        .subscribe((resp: any) => {
          this.hospitales.push( resp.hospital)
          this.cargarHospitales();
        })
    }

  }

  //Abrir modal y mandar parametros para obtener imagen
  abrirModal( hospital : Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img);
  }


}
