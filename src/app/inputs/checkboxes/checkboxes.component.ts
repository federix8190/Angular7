import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss']
})
export class CheckboxesComponent implements OnInit {
  
  @Input() type: String;
  @Input() checkboxOptions:[];
  optionChecked: String;

  constructor() { }

  ngOnInit() {
       //default type
       if (this.type == null){
           this.type = "checkbox"
       }
       
  }

}
