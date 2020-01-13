import { Component, OnInit } from '@angular/core';
import { EstanciaVehiculoService } from 'src/app/services/estancia-vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {

  vehiculo = new Vehiculo();

  Toast = Swal.mixin({ //toast de sweetalert
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private _estanciaService: EstanciaVehiculoService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  saveEntrada() {
    this._estanciaService.saveEntrada(this.vehiculo).subscribe(response => { //servicio para guardar la entrada de vehiculos
      this.Toast.fire({ // mensaje de exito
        icon: 'success',
        title: 'Entrada registrada con éxito',
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { // mensaje de errores
        for (let errores of Object.values(error.error)) {
          for (let err of Object.values(errores)) {
            this.Toast.fire({
              icon: 'error',
              title: `${err}`,
            })
          }
        }
      }
    })
  }
}
