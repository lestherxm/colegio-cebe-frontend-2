//lo mismo para todos los servicios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//Insertar datos del modelo correspondiente
import { CursosAula } from '../models/cursos-aula.model';
//Insertar endpoint correspondiente
const baseUrl = 'http://localhost:3000/cursos-aula';

@Injectable({
  providedIn: 'root'
})
export class CursosAulaService {

  constructor(private http: HttpClient) { }

  getCursosAula(id_aula: any): Observable<CursosAula> {
    return this.http.get<CursosAula>(`${baseUrl}/${id_aula}`); 
  }

  delete(id_aula: any, id_curso: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id_aula}`,id_curso);
  }

}
