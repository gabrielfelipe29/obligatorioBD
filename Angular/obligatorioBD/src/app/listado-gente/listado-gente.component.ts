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
  { email: 'email3@gmail.com', datos: 'Carlos Paz' }];
  date = '2023-11-13';
  email = "";
  datos = "";

  ngOnInit(): void {

    for (let index = 0; index < this.personas.length; index++) {



    }
  }
}
