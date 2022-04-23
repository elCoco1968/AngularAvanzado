import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';



//Pipe sirve para trasnformar de frma visual en como recibo la informacion, no mdifican la base de datos ni el objeto


const base_url = environment.base_url;

//el pipe lo mostramos con el Name de la decoracion
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if (!img) {
      return `${base_url}/upload/${tipo}/no-imagen`;
    } else if (img?.includes('https')) {
      return img
    } else if (img) {
      return `${base_url}/upload/${tipo}/${img}`
    } else {
      return `${base_url}/upload/${tipo}/no-imagen`;
    }

  }

}
