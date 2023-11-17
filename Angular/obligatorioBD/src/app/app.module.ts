import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormularioComponent } from './formulario/formulario.component';
import { SacarFechaComponent } from './sacar-fecha/sacar-fecha.component';
import { CambioFechaPeriodoComponent } from './cambio-fecha-periodo/cambio-fecha-periodo.component';
import { ListadoGenteComponent } from './listado-gente/listado-gente.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FormularioComponent,
    SacarFechaComponent,
    CambioFechaPeriodoComponent,
    ListadoGenteComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
