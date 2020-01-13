import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstanciaVehiculoService {
  
  private url: string = environment.serverUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${this._auth.getToken()}`
  })

  constructor(
    private _http : HttpClient,
    private _auth : AuthService
    ) { }

    saveEntrada(vehiculo):Observable<any> { //Guarda la entrada del vehiculo
      return this._http.post<any>(`${this.url}/entrada`, vehiculo, { headers: this.headers });
    }
    
    saveSalida(vehiculo):Observable<any> { //Guarda la salida del vehiculo
      return this._http.post<any>(`${this.url}/salida`, vehiculo, { headers: this.headers });
    }

    getInforme():Observable<any> { //Genera informe del pago de residentes
      return this._http.get<any>(`${this.url}/informe-pagos`, { headers: this.headers });
    }

    inicioMes():Observable<any> { //inicia el Mes
      return this._http.get<any>(`${this.url}/comenzar`,  { headers: this.headers });
    }
}
