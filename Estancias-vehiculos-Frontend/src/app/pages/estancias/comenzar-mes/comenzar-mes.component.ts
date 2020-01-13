import { Component, OnInit } from '@angular/core';
import { EstanciaVehiculoService } from 'src/app/services/estancia-vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-comenzar-mes',
  templateUrl: './comenzar-mes.component.html',
  styleUrls: ['./comenzar-mes.component.scss']
})
export class ComenzarMesComponent implements OnInit {

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

  inicioMes(){
    this._estanciaService.inicioMes().subscribe(response => { //servicio para iniciar mes
      this.Toast.fire({ //mensaje de exito
        icon: 'success',
        title: 'Mes iniciado con éxito',
      })
      this._router.navigateByUrl('/dashboard')
    }, error => {
      if (error.error) { //si hay errores se muestra el error
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
