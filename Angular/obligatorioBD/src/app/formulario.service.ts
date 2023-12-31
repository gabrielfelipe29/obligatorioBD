import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient) { }

  enviar(formulario: any): Observable<any> {
    return this.http.post("http://localhost:3005/carneSalud", formulario);
  }

  registar(formulario: any): Observable<any> {
    return this.http.post("http://localhost:3005/funcionario", formulario);
  }
  
  obtenerPeriodo(): Observable<any> {
    return this.http.get("http://localhost:3005/peridosActializacion");
  }
  
}
