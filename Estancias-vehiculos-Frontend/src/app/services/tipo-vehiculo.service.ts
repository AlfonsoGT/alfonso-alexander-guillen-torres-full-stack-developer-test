import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  private url: string = environment.serverUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${this._auth.getToken()}`
  })

  constructor(
    private _http : HttpClient,
    private _auth : AuthService
    ) { }

    saveTipo(tipo):Observable<any> {
      return this._http.post<any>(`${this.url}/tipoVehiculos`, tipo, { headers: this.headers });
    }
}
