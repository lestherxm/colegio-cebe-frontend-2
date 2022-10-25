import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OpcionesComponent } from './components/login/opciones/opciones.component';
import { LoginAdminsComponent } from './components/login/login-admins/login-admins.component';
import { LoginDocentesComponent } from './components/login/login-docentes/login-docentes.component';
import { LoginEstudiantesComponent } from './components/login/login-estudiantes/login-estudiantes.component';
import { LoginPadresComponent } from './components/login/login-padres/login-padres.component';
import { MenuAdminsComponent } from './components/administradores/menu-admins/menu-admins.component';
import { AulasListComponent } from './components/administradores/aulas-list/aulas-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'login-admins', component: LoginAdminsComponent },
  { path: 'login-docentes', component: LoginDocentesComponent },
  { path: 'login-estudiantes', component: LoginEstudiantesComponent },
  { path: 'login-padres', component: LoginPadresComponent },

  { path: 'administradores', component: MenuAdminsComponent },
  { path: 'administradores/aulas', component: AulasListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
