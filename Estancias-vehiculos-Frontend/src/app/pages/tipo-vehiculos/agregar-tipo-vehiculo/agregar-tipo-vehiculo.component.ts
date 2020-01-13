import { Component, OnInit } from '@angular/core';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import { TipoVehiculo } from 'src/app/models/tipoVehiculo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-tipo-vehiculo',
  templateUrl: './agregar-tipo-vehiculo.component.html',
  styleUrls: ['./agregar-tipo-vehiculo.component.scss']
})
export class AgregarTipoVehiculoComponent implements OnInit {

  tipo = new TipoVehiculo(); 

  Toast = Swal.mixin({ // toast de sweetalert
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
    private _tipoService: TipoVehiculoService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  saveTipoVehiculo() { //funcion para invocar el servicio de guardar tipo vehiculo

    this._tipoService.saveTipo(this.tipo).subscribe(response => {
      this.Toast.fire({ //mensaje de exito
        icon: 'success',
        title:'Tipo de Vehiculo ' +`${this.tipo.nombre}`+ ' registrado con éxito',
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { //mensajes de error
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
