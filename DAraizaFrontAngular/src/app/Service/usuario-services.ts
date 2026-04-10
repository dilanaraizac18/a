import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Interface/UsuarioModel';
import { Result } from '../Interface/ResultModel';
import { Pais } from '../Interface/PaisModel';
import { Rol } from '../Interface/RolModel';
import { Estado } from '../Interface/EstadoModel';

@Injectable({
  providedIn: 'root',

})
export class UsuarioService{
  private url: string = "http://localhost:8080/demo/api";
  private urlPais : string = "http://localhost:8080/api/pais";
    private urlRol : string = "http://localhost:8080/api/rol";
    private urlEstado : string = "http://localhost:8080/api/estado?idPais=";


  constructor (private http : HttpClient){ }

  getAll(): Observable<Result<UsuarioModel>>{
    return this.http.get<Result<UsuarioModel>>(this.url);
  } 

  add(usuario : UsuarioModel): Observable<Result<UsuarioModel>> {
    return this.http.post<Result<UsuarioModel>>(this.url, usuario)
  }

  getRol(): Observable<Result<Rol>>{
    return this.http.get<Result<Rol>>(this.urlRol)
  }

  getPais(): Observable<Result<Pais>>{
    return this.http.get<Result<Pais>>(this.urlPais)
  }

  getEstado(): Observable<Result<Estado>>{
    return this.http.get<Result<Estado>>(this.urlEstado)
  }


  DeleteUsuario(usuario : UsuarioModel) : Observable<Result<UsuarioModel>>{
    return this.http.delete<Result<UsuarioModel>>(this.url + "/delete" + usuario.IdUsuario);

  }

  
}