import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';


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

  constructor(private fb: FormBuilder, private router: Router,private servicio:ServiciosService) {
    this.createForm();
  }

  createForm(): void {
    this.angForm = this.fb.group({
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
      const date = this.angForm.get('fchNac').value;
      const ci= this.angForm.get('ci').value;
      this.servicio.sacarfecha(ci, date).subscribe(
        data => {
          console.log(data);
          alert("Se agendó con exito.");
        },
        error => {
          //cambiar los msg de error en base a back
          alert(error.error.error)
          console.log(error);
        });
      /* this.mostrar = true;
      const date = this.angForm.get('fchNac').value;
      const ci= this.angForm.get('ci').value;
      this.servicio.sacarfecha(ci,date);
      // Aquí podrías realizar alguna acción como enviar datos al servidor
      // y luego mostrar el mensaje de confirmación
      this.formSubmitted = false; */
    }
  }
}
