import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpcionesComponent } from './components/login/opciones/opciones.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminsComponent } from './components/login/login-admins/login-admins.component';
import { LoginDocentesComponent } from './components/login/login-docentes/login-docentes.component';
import { LoginEstudiantesComponent } from './components/login/login-estudiantes/login-estudiantes.component';
import { LoginPadresComponent } from './components/login/login-padres/login-padres.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuAdminsComponent } from './components/administradores/menu-admins/menu-admins.component';
import { PersonasListComponent } from './components/administradores/personas-list/personas-list.component';
import { Aulas } from './models/aulas.model';
import { AulasListComponent } from './components/administradores/aulas-list/aulas-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OpcionesComponent,
    LoginAdminsComponent,
    LoginDocentesComponent,
    LoginEstudiantesComponent,
    LoginPadresComponent,
    PersonasListComponent,
    AulasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
