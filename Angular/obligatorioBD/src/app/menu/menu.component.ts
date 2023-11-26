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
        console.log(data);
        if (data.enPeriodo) {
          this.router.navigate(['/menu']);
        } else {
          alert('No hay periodos activos');
        }
      },
      error => {
        console.log(error);
        alert(error.error.error);
      });

  }

}
