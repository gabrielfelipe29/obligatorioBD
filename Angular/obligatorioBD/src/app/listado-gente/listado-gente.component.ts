import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListadoService } from '../listado.service';

@Component({
  selector: 'app-listado-gente',
  templateUrl: './listado-gente.component.html',
  styleUrls: ['./listado-gente.component.css']
})
export class ListadoGenteComponent {

  constructor(private router: Router, private service: ListadoService) {

  }
  angForm: FormGroup;
  personas = [];
  datos = "";
  email = "";

  ngOnInit(): void {
    this.listarGente();
  }

  cargarDatos() {
    this.datos = "";
    this.email = "";
    for (let i = 0; i < this.personas.length; i++) {
      this.datos = this.datos + this.personas[i].ci + " - " + this.personas[i].nombre + " - " + this.personas[i].apellido + " - " + this.personas[i].telefono + " - " + this.personas[i].email + " \n";
      this.email = this.email + this.personas[i].email + " \n";
    }
  }
  copiarTexto() {
    var copyText = (<HTMLInputElement>document.getElementById("email"));
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }

  volver() {
    this.router.navigate(['/menu']);
  }

  listarGente() {
    this.service.listado().subscribe(
      data => {
        this.email = ""
        this.datos = ""
        console.log(data);
        this.personas = data;
        this.cargarDatos()
      },
      error => {
        //cambiar los msg de error en base a back
        alert(error.error.error);
        console.log(error);
      });
  }

}
