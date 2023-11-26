import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  sacarfecha(ci,fecha){
    let nuevafecha={
      ci:ci,
      fecha:fecha
    }
    return this.http.post("http://localhost:3000/agenda",nuevafecha,{ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      });
  }
}
