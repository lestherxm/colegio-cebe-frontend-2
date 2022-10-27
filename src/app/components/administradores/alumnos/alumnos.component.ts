import { Component, Input,OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumnos } from 'src/app/models/alumnos.model';  

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  //Array que guarda todos los datos mostrados en tabla
  alumnos?: Alumnos[];

    //Datos a enviar en caso de editar o ver detalles. -guia=modelo
    @Input() currentAlumno: Alumnos = {
      id_alumno: 0,
      cui: '',
      correo: '',
      nombres: '',
      apellidos: '',
      nombre_completo: '',
      genero: '',
      direccion: '',
      esta_activo: false,
      id_aula: 0
    };

  //variables para realizar acciones
  id_action: number = 0;

  constructor
  (
    private AlumnosService: AlumnosService,
    // private route: ActivatedRoute,
    // private router: Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
    //al iniziar el componente se devuelven los datos de la DB a traves de la API de mando del servicio correspondiente
    this.retrieveCursos();
  }

  retrieveCursos(): void {
    this.AlumnosService.getAll()
      .subscribe({
        next: (data) => {
          this.alumnos = data; //se llena el array con la data traida de la API
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCursos();
    this.currentAlumno = {};
  }

  confirmDelete(msgEliminar: any, id: number): void {
    //actualizar el id del curso a eliminar
    this.id_action = id;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  delete(mensajeError: any): void{
    console.log(`Se eliminara el @alumno con @id -> ${this.id_action}`);
      
      this.AlumnosService.delete(this.id_action)
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
