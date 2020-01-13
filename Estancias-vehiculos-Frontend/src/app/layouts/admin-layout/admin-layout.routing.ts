import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OficialesComponent } from '../../pages/vehiculos/oficiales/oficiales.component';
import { ResidentesComponent } from '../../pages/vehiculos/residentes/residentes.component';
import { RegistroEntradaComponent } from '../../pages/estancias/registro-entrada/registro-entrada.component';
import { RegistroSalidaComponent } from '../../pages/estancias/registro-salida/registro-salida.component';
import { ComenzarMesComponent } from '../../pages/estancias/comenzar-mes/comenzar-mes.component';
import { PagoResidentesComponent } from '../../pages/reportes/pago-residentes/pago-residentes.component';
import { AgregarTipoVehiculoComponent } from '../../pages/tipo-vehiculos/agregar-tipo-vehiculo/agregar-tipo-vehiculo.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'vehiculo-oficiales',        component: OficialesComponent },
    { path: 'vehiculo-residente',        component: ResidentesComponent },
    { path: 'entrada-vehiculo',        component: RegistroEntradaComponent },
    { path: 'salida-vehiculo',        component: RegistroSalidaComponent },
    { path: 'comenzar-mes',        component: ComenzarMesComponent },
    { path: 'pagos-residentes',        component: PagoResidentesComponent },
    { path: 'tipo-vehiculo',        component: AgregarTipoVehiculoComponent },

];
