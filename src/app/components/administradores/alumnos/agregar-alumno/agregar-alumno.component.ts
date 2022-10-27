//angular
import { Component, Input, OnInit } from '@angular/core';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//importar modelo y servicio necesario para la tabla
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumnos } from 'src/app/models/alumnos.model';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {
    //datos necesarios para el update
    alumno: Alumnos = {
      cui: '',
      correo: '',
      nombres: '',
      apellidos: '',
      genero: '',
      direccion: '',
      esta_activo: false,
      id_aula: 0
    };

    constructor(
      private AlumnosService: AlumnosService,
      public modal: NgbModal
    ) {}

  ngOnInit(): void {
  }

  save(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if (
      !this.alumno.cui ||
      !this.alumno.correo ||
      !this.alumno.nombres ||
      !this.alumno.apellidos ||
      !this.alumno.genero ||
      !this.alumno.direccion
    ) {
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      const data = {
        cui: this.alumno.cui,
        correo: this.alumno.correo,
        nombres: this.alumno.nombres,
        apellidos: this.alumno.apellidos,
        direccion: this.alumno.direccion,
        genero: this.alumno.genero,
        esta_activo: this.alumno.esta_activo,
        id_aula: this.alumno.id_aula
      };

      this.AlumnosService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          if (!res.error) {
            this.modal.open(mensajeExito, { centered: true });
          } else {
            this.modal.open(mensajeError, { centered: true });
          }
        },
        error: (e) => {
          console.error(e);
          alert('Se ha producido un error al crear el registro.');
        },
      });
    }
  }

}
