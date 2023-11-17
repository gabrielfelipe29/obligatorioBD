import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormularioComponent } from './formulario/formulario.component';
import { SacarFechaComponent } from './sacar-fecha/sacar-fecha.component';
import { CambioFechaPeriodoComponent } from './cambio-fecha-periodo/cambio-fecha-periodo.component';
import { ListadoGenteComponent } from './listado-gente/listado-gente.component';
import { PrincipioComponent } from './principio/principio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FormularioComponent,
    SacarFechaComponent,
    CambioFechaPeriodoComponent,
    ListadoGenteComponent,
    PrincipioComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
