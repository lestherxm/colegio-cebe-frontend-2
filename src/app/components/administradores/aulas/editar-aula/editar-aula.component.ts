import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//** importar modelo y servicio necesario para la tabla
import { AulasService } from 'src/app/services/aulas.service';
import { Aulas } from 'src/app/models/aulas.model';

@Component({
  selector: 'app-editar-aula',
  templateUrl: './editar-aula.component.html',
  styleUrls: ['./editar-aula.component.css']
})
export class EditarAulaComponent implements OnInit {

  @Input() currentAula: Aulas = {
    id_aula: 0,
    nombre: '',
    n_cupos: 0,
  };

  constructor(private AulasService: AulasService,
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.getAula(this.route.snapshot.params['id']);
  }

  getAula(id: number): void {
    this.AulasService.get(id).subscribe({
      next: (data) => {
        this.currentAula = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateAula(
    mensajeExito: any,
    mensajeError: any,
    mensajeDatosFaltantes: any
  ): void {
    //si falt el nombre mostrar la ventan modal
    if (!this.currentAula.nombre) {
      //en caso de que falte un dato mostrar una ventana modal al respecto
      this.modal.open(mensajeDatosFaltantes, { centered: true });
    } else {
      this.AulasService.update(
        this.currentAula.id_aula,
        this.currentAula
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
