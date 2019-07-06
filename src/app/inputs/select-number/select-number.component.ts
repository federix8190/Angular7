import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-number',
  templateUrl: './select-number.component.html',
  styleUrls: ['./select-number.component.scss']
})
export class SelectNumberComponent implements OnInit {
  @Input() placeholder: String;
  @Input() label: String;
  @Input() min: number;
  @Input() max: number;
  opciones:Array<number>= new Array<number>();
  @Output() outNumber = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

    for(var i=this.min; i<= this.max; i++){
      this.opciones.push(i);
    }
  }

  seleccion(event){
    //console.log(event.target.value);
    let valueSelected= event.target.value;
    this.outNumber.emit(valueSelected);
  }


}
