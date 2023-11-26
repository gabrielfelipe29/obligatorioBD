import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sacar-fecha',
  templateUrl: './sacar-fecha.component.html',
  styleUrls: ['../formulario/formulario.component.css']
})
export class SacarFechaComponent {
  formSubmitted: boolean = true;
  mostrar: boolean = false;
  angForm: FormGroup;
  date = new Date;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      fchNac: ['', Validators.required]
    });
  }

  volver() {
    this.router.navigate(['/menu']);
  }


  onSubmit() {
    // Validar el formulario
    // Si llego acá es que ya esta validado el formulario
    if (this.angForm.valid) {
      this.mostrar = true;
      // Aquí podrías realizar alguna acción como enviar datos al servidor
      // y luego mostrar el mensaje de confirmación
      this.formSubmitted = false;
    }
  }
}
