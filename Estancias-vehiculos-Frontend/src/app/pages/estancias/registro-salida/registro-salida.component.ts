import { Component, OnInit } from '@angular/core';
import { EstanciaVehiculoService } from 'src/app/services/estancia-vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.scss']
})
export class RegistroSalidaComponent implements OnInit {

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

  saveSalida() {

    this._estanciaService.saveSalida(this.vehiculo).subscribe(response => { //servicio para guardar las salidas
      this.Toast.fire({ // mensaje de exito
        icon: 'success',
        title: 'Salida registrada con éxito',
        text: `${response.message}`,
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { // mensajes de error
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
