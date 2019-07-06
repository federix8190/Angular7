import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.scss']
})
export class FileUpComponent implements OnInit {
   label: String = "Elegir archivo...";

  constructor() { }

  ngOnInit() {
  }

}
