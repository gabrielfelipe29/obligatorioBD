import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  //CI, nombre, fecha nacimiento, tiene carne de salud (chkbtn), fchvnc carne, comprobante (pdf o jpg)
  escondido = true;
  ngOnInit(): void {
    //limpiar campos?

  }
  date = new Date;
  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required]],
      fchNac: ['', [Validators.required]],
      carne: ['', Validators.required],
      fchVen: '',
      comprobante: ''
    });
  }

  onSelected(value: string): void {
    //pone como requisito que se complete la fecha de vencimiento y comprobante en base a lo que ingrese el usuario
    const controlFchVen = this.angForm.get('fchVen');
    const controlComprobante = this.angForm.get('comprobante');
    if (value === 'si') {
      //pongo los requisitos y cambio escondido a false
      this.escondido = false;
      controlFchVen.setValidators(Validators.required);
      controlComprobante.setValidators(Validators.required);
    } else if (value === 'no') {
      //saco los requisitos y cambio escondido a true
      this.escondido = true;
      controlFchVen.reset();
      controlFchVen.clearValidators();
      controlComprobante.reset();
      controlComprobante.clearValidators();
    }
    controlFchVen.updateValueAndValidity();
    controlComprobante.updateValueAndValidity();
  }
}
