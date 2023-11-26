import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(private http: HttpClient) { }

  listado(): Observable<any> {
    return this.http.get("http://localhost:3005/lista/obtenerNoRegistrados");
  }

}
