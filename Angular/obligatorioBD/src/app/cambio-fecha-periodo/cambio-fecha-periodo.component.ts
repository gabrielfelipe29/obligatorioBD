import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambio-fecha-periodo',
  templateUrl: './cambio-fecha-periodo.component.html',
  styleUrls: ['../formulario/formulario.component.css']
})
export class CambioFechaPeriodoComponent {


  date = new Date;
  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fchVen: ['', [Validators.required]]
    });
  }

}
