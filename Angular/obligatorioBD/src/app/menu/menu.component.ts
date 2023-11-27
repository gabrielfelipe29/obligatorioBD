import { Component, Input } from '@angular/core';
import { FormularioService } from '../formulario.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private service: FormularioService, private router: Router, private serviciolog: LoginService) {

  }
  formulario() {
    //se verifica que se esté en un periodo y se lo deja acceder al formulario

    this.service.obtenerPeriodo().subscribe(
      data => {
        console.log(data);
        if (data.enPeriodo) {
          this.router.navigate(['/formulario']);
        } else {
          alert('No hay periodos activos');
        }
      },
      error => {
        console.log(error);
        alert(error.error.error);
      });




  }
  esAdmin(): boolean {
    const tipoUsuario = this.serviciolog.getTipoUsuario().tipo;
    return tipoUsuario === 'admin';
  }


  cerrarSesion() {
    this.serviciolog.logOut();
    this.router.navigate(['/login']);
  }

}
