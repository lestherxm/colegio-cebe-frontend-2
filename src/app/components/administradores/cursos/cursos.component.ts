import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { CursosService } from 'src/app/services/cursos.service';
import { Cursos } from 'src/app/models/cursos.model';  


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  //Array que guarda todos los datos mostrados en tabla
  cursos?: Cursos[];

  //Datos a enviar en caso de editar o ver detalles. -guia=modelo
  @Input() currentCurso: Cursos = {
    nombre: '',
    descripcion: '',
  };

  //variables para realizar acciones
  id_curso_action: number = 0;

  //consumir servicio
  constructor
  (
    private CursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
    this.retrieveCursos();
  }

  retrieveCursos(): void {
    this.CursosService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveCursos();
    this.currentCurso = {};
  }

  confirmDeleteCurso(msgEliminar: any, id_curso: number): void {
    //actualizar el @id del @curso a eliminar
    this.id_curso_action = id_curso;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  deleteCurso(): void{
    console.log(`Se eliminara el @curso con @id ${this.id_curso_action}`);
      
      this.CursosService.delete(this.id_curso_action)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.modal.dismissAll();
            this.refreshList()
          },
          error: (e) => {
            console.error(e)
          }
        });
  
  }

}
