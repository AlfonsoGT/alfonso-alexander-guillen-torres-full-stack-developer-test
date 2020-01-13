import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = environment.serverUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${this._auth.getToken()}`
  })

  constructor(
    private _http : HttpClient,
    private _auth : AuthService
  ) { }

  getVehiculos():Observable<any> {
    return this._http.get<any>(`${this.url}/vehiculos`, { headers: this.headers });
  }
  
  saveOficial(vehiculo):Observable<any> {
    return this._http.post<any>(`${this.url}/vehiculo-oficial`, vehiculo, { headers: this.headers });
  }
  saveResidente(vehiculo):Observable<any> {
    return this._http.post<any>(`${this.url}/vehiculo-residente`, vehiculo, { headers: this.headers });
  }
}
