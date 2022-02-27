import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../Models/Pedido';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public efetivarCompra(pedido: Pedido): Observable<number> {
    return this.http.post<number>(`${environment.UrlAPI}/api/pedido`, JSON.stringify(pedido), { headers: this.headers });
  }

}