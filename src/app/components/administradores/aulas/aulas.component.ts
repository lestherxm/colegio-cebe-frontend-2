import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { AulasService } from 'src/app/services/aulas.service';
import { Aulas } from 'src/app/models/aulas.model';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {

   //Array que guarda todos los datos mostrados en tabla
  aulas?: Aulas[];

   //Datos a enviar en caso de editar o ver detalles. -guia=modelo
  @Input() currentAula: Aulas = {
    nombre: '',
    n_cupos: 0,
    n_inscritos: 0
  };

  //variables para realizar acciones
  id_aula_action: number = 0;

  constructor
  (
    private AulasService: AulasService,
    private route: ActivatedRoute,
    private router: Router,
    public modal:NgbModal  
  ) { }

  ngOnInit(): void {
    this.retrieveAulas();
  }

  retrieveAulas(): void {
    this.AulasService.getAll()
      .subscribe({
        next: (data) => {
          this.aulas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAulas();
    this.currentAula = {};
  }

  confirmDelete(msgEliminar: any, id_aula: number): void {
    //actualizar el @id del @curso a eliminar
    this.id_aula_action = id_aula;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  delete(mensajeError: any): void{
    console.log(`Se eliminara el @curso con @id ${this.id_aula_action}`);
      
      this.AulasService.delete(this.id_aula_action)
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
