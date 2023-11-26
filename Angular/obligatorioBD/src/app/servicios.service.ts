import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  sacarfecha(ci,fecha){
    const numeroci: number = Number(ci);
    let nuevafecha={
      ci:numeroci,
      fch_agenda:fecha
    }
    return this.http.post("http://localhost:3005/agenda",nuevafecha,{ observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response)
      },
      (error: HttpResponse<any>) => {
        console.log("Hubo un error en el camino " + error)
      });
  }
}
