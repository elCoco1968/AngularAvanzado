import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
//Modulo de graficas demos
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  exports:[
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})

//en este caso necesitamos exportar ese modulo es en las pages, porque alla
//es que lo vamos a utilizar

export class ComponentsModule { }
