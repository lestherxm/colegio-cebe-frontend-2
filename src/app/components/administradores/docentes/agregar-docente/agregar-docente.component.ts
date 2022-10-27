//angular
import { Component, Input, OnInit } from '@angular/core';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//importar modelo y servicio necesario para la tabla
import { DocentesService } from 'src/app/services/docentes.service';
import { Docentes } from 'src/app/models/docentes.model';

@Component({
  selector: 'app-agregar-docente',
  templateUrl: './agregar-docente.component.html',
  styleUrls: ['./agregar-docente.component.css'],
})
export class AgregarDocenteComponent implements OnInit {
  //datos necesarios para el update
  docente: Docentes = {
    cui: '',
    correo: '',
    nombres: '',
    apellidos: '',
    genero: '',
    direccion: '',
    esta_activo: false,
  };

  constructor(
    private DocenteService: DocentesService,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {}

  save(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if (
      !this.docente.cui ||
      !this.docente.correo ||
      !this.docente.nombres ||
      !this.docente.apellidos ||
      !this.docente.genero ||
      !this.docente.direccion
    ) {
      console.log(this.docente.apellidos)
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      const data = {
        cui: this.docente.cui,
        correo: this.docente.correo,
        nombres: this.docente.nombres,
        apellidos: this.docente.apellidos,
        direccion: this.docente.direccion,
        genero: this.docente.genero,
        esta_activo: this.docente.esta_activo
      };

      this.DocenteService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          if (!res.error) {
            this.modal.open(mensajeExito, { centered: true });
          } else {
            this.modal.open(mensajeError, { centered: true });
          }
        },
        error: (e) => {
          //ventana modal de error aqui
          console.error(e);
        },
      });
    }
  }

  newCursos(): void {
    this.docente = {
        cui: '',
        correo: '',
        nombres: '',
        apellidos: '',
        direccion: '',
        genero: '',
        esta_activo:false 
    };
  }
}
