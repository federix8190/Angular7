import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { SwitchComponent } from './switch/switch.component';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { SelectNumberComponent } from './select-number/select-number.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { FileUpComponent } from './file-up/file-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SexoRadiobuttonComponent } from './sexo-radiobutton/sexo-radiobutton.component';

@NgModule({
  declarations: [CheckboxesComponent, SwitchComponent, DatepickerComponent, SelectNumberComponent, EmailInputComponent, FileUpComponent, SexoRadiobuttonComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [CheckboxesComponent,SwitchComponent, DatepickerComponent, SelectNumberComponent, EmailInputComponent, FileUpComponent,  SexoRadiobuttonComponent],
  bootstrap: [SexoRadiobuttonComponent]
})
export class InputsModule { }
