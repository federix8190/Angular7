import {Component} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-elegibles-list',
  templateUrl: './elegibles-list.component.html',
  styleUrls: ['./elegibles-list.component.scss'],
  providers:[SlimLoadingBarService]
})
export class ElegiblesListComponent  {
  constructor()
  {
  }
}
