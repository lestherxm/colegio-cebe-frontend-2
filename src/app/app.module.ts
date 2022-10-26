import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpcionesComponent } from './components/login/opciones/opciones.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminsComponent } from './components/login/login-admins/login-admins.component';
import { LoginDocentesComponent } from './components/login/login-docentes/login-docentes.component';
import { LoginEstudiantesComponent } from './components/login/login-estudiantes/login-estudiantes.component';
import { LoginPadresComponent } from './components/login/login-padres/login-padres.component';

//animaciones y angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

//componentes generados por us
import { MenuAdminsComponent } from './components/administradores/menu-admins/menu-admins.component';
import { AulasComponent } from './components/administradores/aulas/aulas.component';
import { AlumnosComponent } from './components/administradores/alumnos/alumnos.component';
import { DocentesComponent } from './components/administradores/docentes/docentes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OpcionesComponent,
    LoginAdminsComponent,
    LoginDocentesComponent,
    LoginEstudiantesComponent,
    LoginPadresComponent,
    MenuAdminsComponent,
    AulasComponent,
    AlumnosComponent,
    DocentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }