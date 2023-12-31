import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }

  actualizarPeriodo(periodo): Observable<any> {
    return this.http.put("http://localhost:3005/peridosActializacion", periodo);
  }

}
