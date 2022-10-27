//angular
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//** importar modelo y servicio necesario para la tabla
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumnos } from 'src/app/models/alumnos.model';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

    //datos necesarios para el update
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

  //** indicar en constructor el servicio, modal y routing
  constructor(
    private AlumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
    //necesario para que currentX se pueda actualizar
    this.getAlumno(this.route.snapshot.params['id']);
  }

  getAlumno(id: number): void {
    this.AlumnosService.getOne(id).subscribe({
      next: (data) => {
        this.currentAlumno = data;
      },
      error: (e) => console.error(e),
    });
  }

  updateAlumno(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if (
      !this.currentAlumno.cui ||
      !this.currentAlumno.correo ||
      !this.currentAlumno.nombres ||
      !this.currentAlumno.apellidos ||
      !this.currentAlumno.genero ||
      !this.currentAlumno.direccion
    ) {
      console.log(this.currentAlumno);
      //en caso de que falte un dato mostrar una ventana modal al respecto
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      this.AlumnosService.update(
        this.currentAlumno.id_alumno,
        this.currentAlumno
      ).subscribe({
        next: (res) => {
          console.log(res);
          if (!res.error) {
            this.modal.open(mensajeExito, { centered: true });
          } else {
            this.modal.open(mensajeError, { centered: true });
          }
        },
        error: (e) => console.error(e),
      });
    }
  }

}
