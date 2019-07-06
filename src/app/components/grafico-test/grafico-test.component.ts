import { single } from './datos';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-grafico-test',
  templateUrl: './grafico-test.component.html',
  styleUrls: ['./grafico-test.component.scss']
})
export class GraficoTestComponent  {

  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Pais';
  showYAxisLabel = true;
  yAxisLabel = 'Poblacion';

  colorScheme = {
    domain: ['#ffd633', '#b3ffff', '#80aaff', '#ff0040']
  };

  constructor() {
    Object.assign(this, { single })
  }

  onSelect(event) {
    console.log(event);
  }

}
