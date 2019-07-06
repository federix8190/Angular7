import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() label: String
  @Output() cambioEstado = new EventEmitter();
  estado: boolean;

  constructor() { }

  ngOnInit() {

  }

  nuevoEstado(){
      this.cambioEstado.emit(this.estado + "");
  }
}
