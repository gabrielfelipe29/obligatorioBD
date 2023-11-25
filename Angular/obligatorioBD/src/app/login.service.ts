import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,  private cookies: CookieService) { }

  login(user: any): Observable<any> {
    
    return this.http.post("http://localhost:3000/login", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  estaLogeado(){
    return this.cookies.check("userID")
  }

  setTipo(tipo:string){
    this.cookies.set("tipo",tipo)
  }
  
  setUserData(user: string, password: string) {
    this.cookies.set("userID", user);
    /* this.cookies.set("userPassword", password); */
  }
  getUserData(){
    /* return { user: this.cookies.get("userID"), pass: this.cookies.get("userPassword")} */
    return { user: this.cookies.get("userID")}
  }

  gettypeuser(){
    return {tipo: this.cookies.get("type")}
  }

  logOut(){
    this.cookies.delete("userID");
    this.cookies.delete("token");
  }

 

  singUp(user: String, pass: String){
    
  }
}
