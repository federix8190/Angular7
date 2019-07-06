import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-sexo-radiobutton',
  templateUrl: './sexo-radiobutton.component.html',
  styleUrls: ['./sexo-radiobutton.component.scss']
})
export class SexoRadiobuttonComponent implements OnInit {
  model :string;

  @Output()
  cambioEstadoEmit = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    console.log("sexoradio button component.");
    this.model = "M";
    this.cambioEstadoEmit.emit(this.model);
  }

  cambioEstado(){
      this.cambioEstadoEmit.emit(this.model);
  }

}
