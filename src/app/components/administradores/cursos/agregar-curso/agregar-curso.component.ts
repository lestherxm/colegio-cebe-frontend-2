import { Component, OnInit } from '@angular/core';
//importar modelo y servicio necesario para la tabla
import { Cursos } from 'src/app/models/cursos.model';
import { CursosService } from 'src/app/services/cursos.service';
//ventana modal
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css']
})
export class AgregarCursoComponent implements OnInit {

  cursos: Cursos = {
    nombre: '',
    descripcion: '',
  };

  constructor(private CursosService: CursosService, public modal:NgbModal) { }

  ngOnInit(): void {
  }

  saveCursos(mensajeExito:any, mensajeError:any ,mensajeDatosFaltantes:any): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if((!this.cursos.nombre) || (!this.cursos.descripcion)){
        this.modal.open(mensajeDatosFaltantes,{centered:true})
    }else{
      const data = {
        nombre: this.cursos.nombre,
        descripcion: this.cursos.descripcion
      };
  
      this.CursosService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            if(!res.error){
              this.modal.open(mensajeExito,{centered:true})
            }else{
              this.modal.open(mensajeError,{centered:true})
            }
          },
          error: (e) => {
            //ventana modal de error aqui
            console.error(e);
            
          }
        });
      };
    }

    newCursos(): void {
      this.cursos = {
        nombre: '',
        descripcion: '',
      };
    }

}
