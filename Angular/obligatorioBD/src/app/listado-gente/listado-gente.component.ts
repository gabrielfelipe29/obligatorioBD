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
  personas = [{ email: 'email1@gmail.com', datos: 'Pedro Perez' },
  { email: 'email2@gmail.com', datos: 'Juan Sanchez' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' },
  { email: 'email3@gmail.com', datos: 'Carlos Paz' }];
  date = '2023-11-13';
  datos = "";
  email = "";



  ngOnInit(): void {

    for (let i = 0; i < this.personas.length; i++) {
      this.datos = this.datos + this.personas[i].email + " - " + this.personas[i].datos + " \n";
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
        if (data) {
          //llamar lo que esta en ngOnInit y cargar esos datos a los dos textarea

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
