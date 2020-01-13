import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { OficialesComponent } from '../../pages/vehiculos/oficiales/oficiales.component';
import { ResidentesComponent } from '../../pages/vehiculos/residentes/residentes.component';
import { RegistroEntradaComponent } from '../../pages/estancias/registro-entrada/registro-entrada.component';
import { RegistroSalidaComponent } from '../../pages/estancias/registro-salida/registro-salida.component';
import { ComenzarMesComponent } from '../../pages/estancias/comenzar-mes/comenzar-mes.component';
import { PagoResidentesComponent } from '../../pages/reportes/pago-residentes/pago-residentes.component';
import { AgregarTipoVehiculoComponent } from '../../pages/tipo-vehiculos/agregar-tipo-vehiculo/agregar-tipo-vehiculo.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    OficialesComponent,
    ResidentesComponent,
    RegistroEntradaComponent,
    RegistroSalidaComponent,
    ComenzarMesComponent,
    PagoResidentesComponent,
    AgregarTipoVehiculoComponent,
  ]
})

export class AdminLayoutModule {}
