import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("FormPage component!")
  }

  verEstadoSwitch(event){
    console.log("Estado de Switch:" + event)
  }

  printNroSelected(nro){
    console.log("Nro Seleccionado:" + nro);
  }
}
