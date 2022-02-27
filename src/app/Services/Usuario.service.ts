import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario: Usuario = new Usuario();
  
  constructor(private http: HttpClient) { }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get usuario(): Usuario {
    const usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = usuario_json !== null ? JSON.parse(usuario_json) : new Usuario();
    return this._usuario;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public usuario_autenticado(): boolean {
    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
  }

  public usuario_administrador(): boolean{
    return this.usuario_autenticado() && this.usuario.administrador!;
  }

  public limpar_sessao() {
    sessionStorage.setItem("usuario-autenticado", "");
    this._usuario = new Usuario();
  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario>{
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let body = {
        email: usuario.email,
        senha: usuario.senha
    }

    return this.http.post<Usuario>(`${environment.UrlAPI}/api/Usuario/VerificarUsuario`, body, {headers});
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.UrlAPI}/api/Usuario`, JSON.stringify(usuario), { headers: this.headers });
  }

}