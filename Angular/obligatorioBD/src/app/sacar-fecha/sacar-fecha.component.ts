import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sacar-fecha',
  templateUrl: './sacar-fecha.component.html',
  styleUrls: ['./sacar-fecha.component.css']
})
export class SacarFechaComponent {
  group: FormGroup;
  formSubmitted: boolean = true;
  mostrar:boolean=false;

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.group = this.fb.group({
      name: ['', Validators.required],
      ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      fchNac: ['', Validators.required],
    });
  }

  onSubmit() {
    // Validar el formulario
    if (this.group.valid) {
      this.mostrar=true;
      // Aquí podrías realizar alguna acción como enviar datos al servidor
      // y luego mostrar el mensaje de confirmación
      this.formSubmitted = false;
    }
  }
  volver() {
    this.router.navigate(['/menu']);
  }
}
