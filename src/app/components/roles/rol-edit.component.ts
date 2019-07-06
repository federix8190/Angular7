import {Component} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.scss'],
  providers:[SlimLoadingBarService]
})
export class RolEditComponent  {
  constructor()
  {
  }

}
