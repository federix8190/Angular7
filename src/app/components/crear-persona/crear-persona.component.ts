import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Personas } from 'src/app/models/personas';
import { PersonasService } from 'src/app/services/personas.service';
@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {
  public formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombres:"",
      apellidos:"",
      documentos:"",
      telefono:"",
      email:""
    });
  }

  setSexo(sexo){
      console.log(sexo);
  }

}
