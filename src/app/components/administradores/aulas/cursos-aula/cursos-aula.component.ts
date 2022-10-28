import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//** importar modelo y servicio necesario para la tabla
import { CursosAulaService } from 'src/app/services/cursos-aula.service';
import { CursosAula } from 'src/app/models/cursos-aula.model';  

@Component({
  selector: 'app-cursos-aula',
  templateUrl: './cursos-aula.component.html',
  styleUrls: ['./cursos-aula.component.css']
})
export class CursosAulaComponent implements OnInit {
    //Array que guarda todos los datos mostrados en tabla
    cursosAula?: any;

    //Datos a enviar en caso de editar o ver detalles. -guia=modelo
    @Input() currentCurso: CursosAula = {
      id_curso: 0,
      nombre: '',
      descripcion: ''
    };

  //variables para realizar acciones
  id_curso_aula_action: number = 0;

  //consumir servicio
  constructor
  (
    private CursosAulaService: CursosAulaService,
    private route: ActivatedRoute,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
    this.retrieveCursos(this.route.snapshot.params['id']);
  }

  retrieveCursos(id: number): void {
    this.CursosAulaService.getCursosAula(id)
      .subscribe({
        next: (data) => {
          this.cursosAula = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  confirmDelete(askEliminar: any, id_curso: number): void {
    //actualizar el @id del @curso a eliminar
    this.id_curso_aula_action = id_curso;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(askEliminar,{centered:true})
  }

  refreshList(): void {
    this.retrieveCursos(this.route.snapshot.params['id']);
    this.currentCurso = {};
  }

  delete(mensajeError: any): void{
    console.log(`Se eliminara el @curso con @id ${this.id_curso_aula_action }`);
      this.CursosAulaService.delete(this.route.snapshot.params['id'], this.id_curso_aula_action)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.modal.dismissAll(); //cerrar ventana de confirmacion
            this.refreshList() //refrezcar lista
            if (res.error){//en caso de haber error indicarselo al usuario
              this.modal.open(mensajeError, { centered: true });
            }
          },
          error: (e) => {
            console.error(e);
            alert('Hubo un erro al eliminar el registro.');
          }
        });
  
  }

}
