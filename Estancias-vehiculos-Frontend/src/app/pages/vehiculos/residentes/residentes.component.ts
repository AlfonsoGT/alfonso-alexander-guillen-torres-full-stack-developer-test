import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.scss']
})
export class ResidentesComponent implements OnInit {

  vehiculo = new Vehiculo();

  Toast = Swal.mixin({
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
    private _vehiculoService: VehiculoService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  saveResidente() { //metodo para invocar el servicio que guarda vehiculos residentes

    this._vehiculoService.saveResidente(this.vehiculo).subscribe(response => {
      this.Toast.fire({ //mensaje de exito
        icon: 'success',
        title: 'Vehiculo Guardado Exitosamente',
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { //si hay errores se muestran los errores
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
