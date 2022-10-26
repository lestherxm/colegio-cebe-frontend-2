import { Component, Input,OnInit } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/models/cursos.model';  
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos?: Cursos[];
  //currentIndex = -1;
  //nombre = '';

  @Input() viewMode = false;

  @Input() currentCurso: Cursos = {
    nombre: '',
    descripcion: '',
  };

  id_curso_delete: number = 0;

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
    // this.currentIndex = -1;
  }

  confirmDeleteCurso(msgEliminar: any, id_curso: number): void {
    //actualizar el id del curso a eliminar
    this.id_curso_delete = id_curso;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  deleteCurso(): void{
    console.log(`Se eliminara el curso con id ${this.id_curso_delete}`);
      
      this.CursosService.delete(this.id_curso_delete)
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
