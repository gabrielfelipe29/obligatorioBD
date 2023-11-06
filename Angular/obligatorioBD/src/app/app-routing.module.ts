import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SacarFechaComponent } from './sacar-fecha/sacar-fecha.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoGenteComponent } from './listado-gente/listado-gente.component';
import { CambioFechaPeriodoComponent } from './cambio-fecha-periodo/cambio-fecha-periodo.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sacarfecha', component: SacarFechaComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'listado', component: ListadoGenteComponent },
  { path: 'cambiarperiodo', component: CambioFechaPeriodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
