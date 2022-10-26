//angular
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//** importar modelo y servicio necesario para la tabla
import { DocentesService } from 'src/app/services/docentes.service';
import { Docentes } from 'src/app/models/docentes.model';

@Component({
  selector: 'app-editar-docente',
  templateUrl: './editar-docente.component.html',
  styleUrls: ['./editar-docente.component.css'],
})
export class EditarDocenteComponent implements OnInit {

  //datos necesarios para el update
  @Input() currentDocente: Docentes = {
    id_docente: 0,
    cui: '',
    correo: '',
    nombres: '',
    apellidos: '',
    nombre_completo: '',
    genero: '',
    direccion: '',
    esta_activo: false,
  };

  //** indicar en constructor el servicio, modal y routing
  constructor(
    private DocentesService: DocentesService,
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
    //necesario para que currentX se pueda actualizar
    this.getDocente(this.route.snapshot.params['id']);
  }

  getDocente(id: number): void {
    this.DocentesService.getOne(id).subscribe({
      next: (data) => {
        this.currentDocente = data;
      },
      error: (e) => console.error(e),
    });
  }

  updateDocente(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if (
      !this.currentDocente.cui ||
      !this.currentDocente.correo ||
      !this.currentDocente.nombres ||
      !this.currentDocente.apellidos ||
      !this.currentDocente.genero ||
      !this.currentDocente.direccion
    ) {
      console.log(this.currentDocente.genero);
      console.log(this.currentDocente.esta_activo)
      
      //en caso de que falte un dato mostrar una ventana modal al respecto
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      this.DocentesService.update(
        this.currentDocente.id_docente,
        this.currentDocente
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
