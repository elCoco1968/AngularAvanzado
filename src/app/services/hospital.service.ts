import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  
  
  
  constructor(private http: HttpClient) { }
  
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales(){

    return this.http.get(`${base_url}/hospitales`, this.headers)
                .pipe(
                  map( (resp: any ) => resp.hospitales)
                );
  }

  crearHospital( name: string){
    return this.http.post(`${base_url}/hospitales`, {name} ,this.headers);
                    
  }


  actualizarHospital( _id: string ,name: string){
    return this.http.put(`${base_url}/hospitales/${_id}`, {name} ,this.headers);
                    
  }

  borrarHospital( _id: string){
    return this.http.delete(`${base_url}/hospitales/${_id}`,this.headers);
                    
  }
}
