import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  user = ""
  password = ""

  userValid: Boolean = true
  passValid: Boolean = true

  signup(){
    this.router.navigate(['/registro']);
  }

  login() {
    const administrador = { administrador: { id: this.user, contraseña: this.password }};
    this.loginService.login(administrador).subscribe(
      data => {
        if (data && data.token) {
          console.log(data)
          this.loginService.setToken(data.token);
          this.loginService.setUserData(this.user, this.password);
          this.router.navigateByUrl('/inicio');
        }
        
      },
      error => {
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
