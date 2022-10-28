import { Component, Input,OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//relacionado con la tabla db
import { DocentesService } from 'src/app/services/docentes.service';
import { Docentes } from 'src/app/models/docentes.model';  
//descargar pdf
// import jsPDF from 'jspdf';
const jsPDF = require('jspdf');
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  //Array que guarda todos los datos mostrados en tabla
  docentes?: Docentes[];
  //ESta variable contendra los datos para pasarlo a pdf, literalmente es @docentes pero en html
  DATA?: any;
  //Datos a enviar en caso de editar o ver detalles. -guia=modelo
  @Input() currentDocente: Docentes = {
    id_docente: 0,
    cui: '',
    correo: '',
    nombres: '',
    apellidos: '',
    nombre_completo: '',
    genero: '',
    direccion: '',
    esta_activo: false
  };

  //variables para realizar acciones
  id_action: number = 0;

  constructor
  (
    private DocentesService: DocentesService,
    // private route: ActivatedRoute,
    // private router: Router,
    public modal:NgbModal
  ) { 
    // this.downloadPDF();
  }

  ngOnInit(): void {
    //al iniziar el componente se devuelven los datos de la DB a traves de la API de mando del servicio correspondiente
    this.retrieveCursos();
    //seteamos la tabla con los datos, para poder imprimir un pdf con esa data
    this.DATA = document.getElementById('htmlData');
  }

  retrieveCursos(): void {
    this.DocentesService.getAll()
      .subscribe({
        next: (data) => {
          this.docentes = data; //se llena el array con la data traida de la API
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveCursos();
    this.currentDocente = {};
  }

  confirmDelete(msgEliminar: any, id: number): void {
    //actualizar el id del curso a eliminar
    this.id_action = id;
    //Se pregunta primero al usuario si realmente desea elmininar el registro y basado en su respuesta se realiza la accion
    this.modal.open(msgEliminar,{centered:true})
  }

  delete(mensajeError: any): void{
    console.log(`Se eliminara el @docente con @id -> ${this.id_action}`);
      this.DocentesService.delete(this.id_action)
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

  // ver explicacion
  //https://mugan86.medium.com/exportar-pdfs-en-angular-con-jspdf-85c7a11a110f
  downloadPDF() {
    // const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(this.DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_colegio_cebe.pdf`);
    });
  }

}
