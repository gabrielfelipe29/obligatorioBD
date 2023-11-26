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
    this.router.navigate(['/register']);
  }

  login() {
    this.loginService.login(this.user,this.password).subscribe(
      data => {
          this.loginService.setTipo(data.tipo)
          this.router.navigateByUrl('/inicio');
      },
      error => {
        alert(error)
        console.log(error);
      });
  }
}
