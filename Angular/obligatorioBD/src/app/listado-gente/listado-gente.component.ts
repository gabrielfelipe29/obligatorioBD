import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listado-gente',
  templateUrl: './listado-gente.component.html',
  styleUrls: ['./listado-gente.component.css']
})
export class ListadoGenteComponent {
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


    var copyText = (<HTMLInputElement>document.getElementById("email"));

    copyText.click = function () {
      document.execCommand("copy");
    }

    copyText.addEventListener("copy", function (event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", copyText.value);
        console.log(event.clipboardData.getData("text"))
      }
    });
  }

  copiarTexto() {
    var copyText = (<HTMLInputElement>document.getElementById("email"));
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  }



}
