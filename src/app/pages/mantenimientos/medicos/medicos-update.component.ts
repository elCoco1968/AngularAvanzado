import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos-update',
  templateUrl: './medicos-update.component.html',
  styles: [
  ]
})
export class MedicosUpdateComponent implements OnInit {


  public hospitales : Hospital[] = [];
  public medicoForm?: FormGroup;
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor( private fb : FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicosService,
    private router: Router,
    //con esto obtenemos todos los parametros que vengan por la URL 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    //para extraer el id desde la url
    this.activatedRoute.params.subscribe( params => {
      //obtenemos los parametros el id para ser exactos
      const id: any = params['id'] || null;
      this.cargarMedico(id);
    })

    this.medicoService.obtenerMedicoPorId

    this.medicoForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.cargarHospitales();

    //obtenemos el campo hospital de nuestro formulario y con valueChanges (es un observable) nos subscribimos a el
    //el valuechanges se va a ejecutar cadavez que vea un cambio
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          //con esto vamos a tener toda la informacion del hospital seleccionado, la logica es ir a buscar
          //en el arreglo que tenemos de hospitales y buscar el que coincida con el ID pasado
          this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId )
          
        })
  }


  cargarMedico(id: string){

    //con esto solucionamos el error de los undefindes name y hospital
    if(id === 'nuevo'){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
        //para solucioanr problema que no nos cargaba la imagen utilizamos un delay
        .pipe(
          delay(200)
        )
        .subscribe(medico => {

          //si no existe el id que nos devuelva  a la pagina de medicos
          if(!medico){
            this.router.navigateByUrl(`/dashboard/medicos`)
          }


          //desestructuracion de la peticion sacamos el name y el id del hospital
          const {name, hospital:{_id}} = medico;
          this.medicoSeleccionado = medico;
          //seteamos los valores al los inputs
          this.medicoForm?.setValue({name,hospital: _id })
        })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    })
  }


  guardarMedico(){
   
    const {name} = this.medicoForm?.value;
    //si existe el medico seleccionado vamos a actualizar 
    if (this.medicoSeleccionado) {

      const data = {
        ...this.medicoForm?.value,
        _id : this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
          .subscribe(resp =>{
            Swal.fire('Actualizado', `${ name} Actualizado correctamente`, 'success' );
          })

      //si no existe lo vamos a crear
    } else {
      
      //De esta manera obtenemos valores desesctructurados
      const {name} = this.medicoForm?.value;
  
      this.medicoService.crearMedico(this.medicoForm?.value)
          .subscribe( (resp : any) => {
            Swal.fire('Creado', `${ name} Creado correctamente`, 'success' );
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
          })
    }


  }

  

}
