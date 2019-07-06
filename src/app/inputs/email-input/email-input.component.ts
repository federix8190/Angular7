import { Component, Renderer2,OnInit, Input, ViewChild ,ElementRef } from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements OnInit {
  @Input() label: String;
  @Input() placeholder: String;
  @ViewChild("InputEmail") emailInput: ElementRef;
  email:string;
  valido: boolean;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.valido= true;
  }

  isValid(){
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      console.log("Email:" + this.email);
      if(!this.valido){
        this.renderer.removeClass(this.emailInput.nativeElement,"is-invalid");
      }else {
        this.renderer.removeClass(this.emailInput.nativeElement,"is-valid");
      }


      if(emailPattern.test(this.email)){
          console.log("es valido el email");
          this.valido = true;
          this.renderer.addClass(this.emailInput.nativeElement,"is-valid");
      }else {
        this.valido = false;
        this.renderer.addClass(this.emailInput.nativeElement,"is-invalid");
      }
  }



}
