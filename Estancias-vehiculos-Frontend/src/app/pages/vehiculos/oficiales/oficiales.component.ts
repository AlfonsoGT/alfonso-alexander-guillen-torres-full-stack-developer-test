import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-oficiales',
  templateUrl: './oficiales.component.html',
  styleUrls: ['./oficiales.component.scss']
})
export class OficialesComponent implements OnInit {

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
    private _vehiculoService: VehiculoService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  saveOficial() { //metodo para ejecutar el servicio que guarda vehiculos oficiales
    this._vehiculoService.saveOficial(this.vehiculo).subscribe(response => {
      this.Toast.fire({//mensaje de exito
        icon: 'success',
        title: 'Vehiculo Guardado Exitosamente',
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { //mensajes de errores
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
