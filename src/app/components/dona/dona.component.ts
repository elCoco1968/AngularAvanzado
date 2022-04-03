import { Component, Input} from '@angular/core';

//Libreria para graficos
import { ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{

  @Input() title: string = 'sin titulo';

    // Doughnut
    @Input('labels') labels: string[] = ['label1','label2','label3'];
    @Input('data') doughnutChartData: ChartData<'doughnut'> = {
      labels: this.labels,
      datasets: [
        { data: [] },
      
      ]
    };
    public doughnutChartType: ChartType = 'doughnut';
  

 
}
