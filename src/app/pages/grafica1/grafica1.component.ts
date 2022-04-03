import { Component } from '@angular/core';

//Libreria para graficos
import { ChartData, ChartType, Color } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = [ 'aaa', '2', '3' ];
  data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [100,10,100] },
    
    ]
  };

  labels2: string[] = [ 'A', '2B', 'B' ];
  data2: ChartData<'doughnut'> = {
    labels: this.labels2,
    datasets: [
      { data: [10,10,100] },
    
    ]
  };
  labels3: string[] = [ '1', '2', '0'];
  data3: ChartData<'doughnut'> = {
    labels: this.labels3,
    datasets: [
      { data: [200,10,100] },
    
    ]
  };
  labels4: string[] = [ '1', '2', '3' ];
  data4: ChartData<'doughnut'> = {
    labels: this.labels4,
    datasets: [
      { data: [100,190,100] },
    
    ]
  };

}
