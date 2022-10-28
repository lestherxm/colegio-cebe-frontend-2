//angular
import { Component, OnInit } from '@angular/core';

//ventana modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//importar modelo y servicio necesario para la tabla
import { Aulas } from 'src/app/models/aulas.model';
import { AulasService } from 'src/app/services/aulas.service';

@Component({
    selector: 'app-agregar-aula',
    templateUrl: './agregar-aula.component.html',
    styleUrls: ['./agregar-aula.component.css'],
})
export class AgregarAulaComponent implements OnInit {
    aulas: Aulas = {
        nombre: '',
        n_cupos: 0,
    };

    constructor(private AulasService: AulasService, public modal: NgbModal) { }

    ngOnInit(): void { }

    saveAulas(
        mensajeExito: any,
        mensajeError: any,
        mensajeDatosFaltantes: any
    ): void {
        //si falta el nombre del aula, mostrar la ventana modal
        if (!this.aulas.nombre) {
            this.modal.open(mensajeDatosFaltantes, { centered: true });
        } else {
            const data = {
                nombre: this.aulas.nombre,
                n_cupos: this.aulas.n_cupos,
            };

            this.AulasService.create(data).subscribe({
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

    newAulas(): void {
        this.aulas = {
            nombre: '',
            n_cupos: 0,
        };
    }

}
