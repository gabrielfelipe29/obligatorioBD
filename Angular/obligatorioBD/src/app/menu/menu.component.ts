import { Component } from '@angular/core';
import { FormularioService } from '../formulario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private service: FormularioService, private router: Router) {

  }

  formulario() {
    //se verifica que se esté en un periodo y se lo deja acceder al formulario

    this.service.obtenerPeriodo().subscribe(
      data => {
        if (data == true) {
          this.router.navigate(['/menu']);
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
        alert("No hay periodos activos.");
      });

  }

}
