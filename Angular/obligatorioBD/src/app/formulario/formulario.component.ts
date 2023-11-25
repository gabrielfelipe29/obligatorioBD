import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioService } from '../formulario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  @Input() registrar: boolean = false;
  header: String = "FORMULARIO ACTUALIZACIÓN DE DATOS";
  //CI, nombre, fecha nacimiento, tiene carne de salud (chkbtn), fchvnc carne, comprobante (pdf o jpg)
  escondido = true;

  date = new Date;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private service: FormularioService, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    //limpiar campos?
    if (this.registrar) {
      const controlUsername = this.angForm.get('username');
      const controlPassword = this.angForm.get('password');
      const controlDomicilio = this.angForm.get('domicilio');
      const controlEmail = this.angForm.get('email');
      const controlTel = this.angForm.get('tel');

      controlUsername.setValidators(Validators.required);
      controlPassword.setValidators(Validators.required);
      controlDomicilio.setValidators(Validators.required);
      controlEmail.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]);
      controlTel.setValidators([Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]);
      this.header = "REGISTRARSE"
    }
  }


  createForm() {
    this.angForm = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required]],
      fchNac: ['', [Validators.required]],
      carne: ['', Validators.required],
      fchVen: '',
      comprobante: '',
      username: '',//required
      password: '',//required
      domicilio: '',//required
      email: '',//required, pattern
      tel: ''//required, pattern, lenght
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

  volver() {
    if (this.registrar) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/menu']);
    }
  }

  enviarFormulario() {
    //volver a verificar el periodo?
    const formulario = { formulario: this.angForm.value };
    console.log(formulario);
    if (this.registrar) {
      this.service.registar(formulario).subscribe(
        data => {
          if (data) {
            //mostrar msg de exito
            alert("Formulario enviado con éxito.");
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
    } else {
      this.service.enviar(formulario).subscribe(
        data => {
          if (data) {
            //mostrar msg de exito
            alert("Formulario enviado con éxito.");

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
}
