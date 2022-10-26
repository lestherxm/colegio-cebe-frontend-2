import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from '../models/cursos.model';

const baseUrl = 'http://localhost:3000/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(baseUrl);
  }

  get(id_curso: any): Observable<Cursos> {
    return this.http.get<Cursos>(`${baseUrl}/${id_curso}`); 
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id_curso: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id_curso}`, data);
  }

  delete(id_curso: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id_curso}`);
  }

} 
