import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {Ng2SmartTableModule} from 'ng2-smart-table';

import {BaseRoutingModule} from './base-routing.module';
import {BaseComponent} from './base.component';
import {PersonasService} from 'src/app/services/personas.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    SlimLoadingBarModule,
  ],
  providers: [
    PersonasService,
  ]
})
export class BaseModule {
}
