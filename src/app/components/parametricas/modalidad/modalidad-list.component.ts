import {Component} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-modalidad-list',
  templateUrl: 'modalidad-list.component.html',
  styleUrls: ['modalidad-list.component.scss'],
  providers:[SlimLoadingBarService]
})
export class ModalidadListComponent  {
  constructor()
  {
  }
}
