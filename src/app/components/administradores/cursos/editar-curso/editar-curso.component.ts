import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//importar modelo y servicio necesario para la tabla
import { CursosService } from 'src/app/services/cursos.service';
import { Cursos } from 'src/app/models/cursos.model';
//ventana modal
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  @Input() currentCurso: Cursos = {
    id_curso: 0,
    nombre: '',
    descripcion: '',
  };

  constructor
  (
    private CursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router,
    public modal:NgbModal
  ) { }

  ngOnInit(): void {
      this.getCurso(this.route.snapshot.params["id"]);
  }

  getCurso(id: number): void {
    this.CursosService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCurso = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateCurso(mensajeExito:any, mensajeError:any ,mensajeDatosFaltantes:any): void {
    //ya sea el nombre o la descripcion, si uno de los dos falta mostrar la ventan modal
    if((!this.currentCurso.nombre) || (!this.currentCurso.descripcion)){
      //en caso de que falte un dato mostrar una ventana modal al respecto
      this.modal.open(mensajeDatosFaltantes,{centered:true})
    }else{
      this.CursosService.update(this.currentCurso.id_curso, this.currentCurso)
        .subscribe({
          next: (res) => {
            console.log(res);
            console.log(res);
            if(!res.error){
              this.modal.open(mensajeExito,{centered:true})
            }else{
              this.modal.open(mensajeError,{centered:true})
            }
          },
          error: (e) => console.error(e)
        });
    }

  }

}
