import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PeriodoService } from '../periodo.service';
import { Router } from '@angular/router';





export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //valida que la fecha de inicio de periodo sea anterior o igual a la fecha de fin de periodo. 
  const fchIn = control.get('fchIn');
  const fchFin = control.get('fchVen');
  if (!fchIn || !fchFin) {
    //si alguno esta vacio, no verifico si tiene errores, asi lo verifica solo cuando haya
    // ingresado la fecha de los dos
    return null;
  } else {
    if (Date.parse(fchIn.value) > Date.parse(fchFin.value)) {
      fchIn.setErrors({ 'fechasInvalidas': true });
      fchFin.setErrors({ 'fechasInvalidas': true });
      return { fechasInvalidas: true }
    } else {
      var res = false;
      if (fchIn.hasError('fechasInvalidas')) {
        //delete fchIn.errors['fechasInvalidas'];
        fchIn.setErrors(null);
        res = true;
      }
      if (fchFin.hasError('fechasInvalidas')) {
        //delete fchFin.errors['fechasInvalidas'];
        fchFin.setErrors(null);
        res = true;
      }
      if (res) {
        control.updateValueAndValidity();
      }
      return null;
    }
  }
}

@Component({
  selector: 'app-cambio-fecha-periodo',
  templateUrl: './cambio-fecha-periodo.component.html',
  styleUrls: ['../formulario/formulario.component.css']
})
export class CambioFechaPeriodoComponent {

  date = new Date;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private service: PeriodoService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fchVen: ['', [Validators.required]],
      fchIn: ['', [Validators.required]]
    }, { validators: dateValidator } as AbstractControlOptions);
  }

  volver() {
    this.router.navigate(['/menu']);
  }

  enviarPeriodo() {
    const periodo = { periodo: this.angForm.value };
    this.service.actualizarPeriodo(periodo).subscribe(
      data => {
        if (data) {
          //mostrar listado

        }
      },
      error => {
        //cambiar los msg de error en base a back
        if (error.status == 401) {
          alert("Error, contraseña incorrecta o usuario incorrecto")
        }

        if (error.status == 400) {
          alert("Error en el formato de los datos")
        }
        console.log(error);
      });
  }
}

