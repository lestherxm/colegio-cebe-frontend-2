import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OpcionesComponent } from './components/login/opciones/opciones.component';
import { LoginAdminsComponent } from './components/login/login-admins/login-admins.component';
import { LoginDocentesComponent } from './components/login/login-docentes/login-docentes.component';
import { LoginEstudiantesComponent } from './components/login/login-estudiantes/login-estudiantes.component';
import { LoginPadresComponent } from './components/login/login-padres/login-padres.component';
import { MenuAdminsComponent } from './components/administradores/menu-admins/menu-admins.component';
import { AulasComponent } from './components/administradores/aulas/aulas.component';
import { DocentesComponent } from './components/administradores/docentes/docentes.component';
import { AlumnosComponent } from './components/administradores/alumnos/alumnos.component';
import { CursosComponent } from './components/administradores/cursos/cursos.component';
import { AgregarCursoComponent } from './components/administradores/cursos/agregar-curso/agregar-curso.component';
import { EditarCursoComponent } from './components/administradores/cursos/editar-curso/editar-curso.component';
import { EditarDocenteComponent } from './components/administradores/docentes/editar-docente/editar-docente.component';
import { AgregarDocenteComponent } from './components/administradores/docentes/agregar-docente/agregar-docente.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'login-admins', component: LoginAdminsComponent },
  { path: 'login-docentes', component: LoginDocentesComponent },
  { path: 'login-estudiantes', component: LoginEstudiantesComponent },
  { path: 'login-padres', component: LoginPadresComponent },
  { path: 'menu-admins', component: MenuAdminsComponent,
    children:[
      
      { path: 'agregar-curso', component: AgregarCursoComponent },
      { path: 'cursos', component: CursosComponent},
      { path: 'editar-curso/:id', component: EditarCursoComponent},
      
      { path: 'docentes', component: DocentesComponent },
      { path: 'agregar-docente', component:  AgregarDocenteComponent},
      { path: 'editar-docente/:id', component:  EditarDocenteComponent},

      { path: 'alumnos', component:  AlumnosComponent},
      

      { path: 'aulas', component: AulasComponent }
      
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
