import { Component } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  admin:boolean=false;
  constructor(private log:LoginService){}
    getadmin(){
      const userType = this.log.gettypeuser();
      if (userType.tipo=="admin"){
        this.admin=true;
      }
    }
    
}
