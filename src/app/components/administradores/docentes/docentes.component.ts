import { Component, Input,OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { DocentesService } from 'src/app/services/docentes.service';
import { Docentes } from 'src/app/models/docentes.model';  

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  //Array que guarda todos los datos mostrados en tabla
  docentes?: Docentes[];

  //Datos a enviar en caso de editar o ver detalles. -guia=modelo
  @Input() currentDocente: Docentes = {
    id_docente: 0,
    cui: '',
    correo: '',
    nombres: '',
    apellidos: '',
    nombre_completo: '',
    genero: '',
    direccion: '',
    esta_activo: false
  };

  //variables para realizar acciones
  id_action: number = 0;

  constructor
  (
    private DocentesService: DocentesService,
    // private route: ActivatedRoute,
    // private router: Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
    //al iniziar el componente se devuelven los datos de la DB a traves de la API de mando del servicio correspondiente
    this.retrieveCursos();
  }

  retrieveCursos(): void {
    this.DocentesService.getAll()
      .subscribe({
        next: (data) => {
          this.docentes = data; //se llena el array con la data traida de la API
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveCursos();
    this.currentDocente = {};
  }

  confirmDeleteCurso(msgEliminar: any, id: number): void {
    //actualizar el id del curso a eliminar
    this.id_action = id;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  deleteCurso(): void{
    console.log(`Se eliminara el @docente con @cui -> ${this.id_action}`);
      
      this.DocentesService.delete(this.id_action)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.modal.dismissAll();
            this.refreshList()
          },
          error: (e) => {
            console.error(e);
            alert('Hubo un erro al eliminar el registro.');
          }
        });
  
  }

}
