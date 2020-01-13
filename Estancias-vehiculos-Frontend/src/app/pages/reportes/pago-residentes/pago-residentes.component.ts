import { Component, OnInit, ViewChild } from '@angular/core';
import { EstanciaVehiculoService } from 'src/app/services/estancia-vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';

declare let jsPDF;

@Component({
  selector: 'app-pago-residentes',
  templateUrl: './pago-residentes.component.html',
  styleUrls: ['./pago-residentes.component.scss']
})
export class PagoResidentesComponent implements OnInit {

  nombre_archivo: string; //variable para el nombre que4 se le de al archivo
  reporte: any = {}; // variable para recibir los datos del reporte en formato json 


  constructor(
    private _resultadoService: EstanciaVehiculoService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInforme(); //invocar el metodo que trae los datos del reporte
  }

  getInforme() {
    this._activatedRoute.params.subscribe(params => {
      this._resultadoService.getInforme().subscribe(response => {
        this.reporte = response.data; //asignacion de los datos de la peticion a nuestra variable
        console.log(this.reporte);
      });
    });
  }

  downloadPDF() { //metodo para crear el archivo

    var doc = new jsPDF('p', 'pt', 'a4', true); // variable del archivo y formato tama;o carta
    doc.text('Pagos de residentes', 20, 40).setFontSize(11); // titulo del reporte

    var col = ["Num. Placa", "Tiempo estacionado(MIN)", "Cantidad a Pagar"]; // Titulos de las columnas
    var rows = []; //variable para las filas de la tabla

    this.reporte.forEach(element => { //convirtiendo el contenido de reporte de json a arreglo
      const temp = [element.placa, element.tiempo_parqueado, element.pago];
      rows.push(temp);

    });

    doc.autoTable(col, rows, { margin: { top: 80 },  headStyles: {fillColor: 0} }); // creacion de la tabla con columnas y filas
    doc.save(this.nombre_archivo + '.pdf'); // crear el pdf con el nombre asignado, si no se escribe sera undefines por defecto
  }

}
