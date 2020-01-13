import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/vehiculo-oficiales', title: 'Vehiculos Oficiales',  icon:'business_badge', class: '' },
    { path: '/vehiculo-residente', title: 'Vehiculos Residentes',  icon:'business_bank', class: '' },
    { path: '/entrada-vehiculo', title: 'Registro de Entrada',  icon:'ui-1_check', class: '' },
    { path: '/salida-vehiculo', title: 'Registro de Salida',  icon:'shopping_delivery-fast', class: '' },
    { path: '/pagos-residentes', title: 'Pago de residentes',  icon:'business_money-coins', class: '' },
    { path: '/comenzar-mes', title: 'Iniciar Mes',  icon:'design_bullet-list-67', class: '' },
    { path: '/tipo-vehiculo', title: 'Agregar tipo vehiculo',  icon:'ui-1_simple-add', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private _auth : AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  logout(event : MouseEvent){

    event.preventDefault();

    this._auth.logout().subscribe(response =>{
      if(response.status == 200){
        this.router.navigateByUrl('/auth/login');
        this._auth.removeToken();
        localStorage.removeItem('userid');
        localStorage.removeItem('email');
      }
    },
    error => {
      console.log(error);
    })
  }
}
