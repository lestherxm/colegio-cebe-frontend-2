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

}
