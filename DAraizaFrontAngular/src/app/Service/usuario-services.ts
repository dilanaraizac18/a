import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Interface/UsuarioModel';
import { Result } from '../Interface/ResultModel';
import { Pais } from '../Interface/PaisModel';
import { Rol } from '../Interface/RolModel';
import { Estado } from '../Interface/EstadoModel';
import { Municipio } from '../Interface/MunicipioModel';
import { Colonia } from '../Interface/ColoniaModel';

@Injectable({
  providedIn: 'root',

})
export class UsuarioService{
  private url: string = "http://localhost:8080/demo/api";
  private urlPais : string = "http://localhost:8080/api/pais";
    private urlRol : string = "http://localhost:8080/api/rol";
    private urlEstado : string = "http://localhost:8080/api/estado?idPais=";
  private urlMunicipio: string = "http://localhost:8080/api/municipio?idEstado="
  private urlColonia: string = "http://localhost:8080/api/colonia?idMunicipio="
  
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

 

  getEstado(idPais: any): Observable<Result<Estado>>{
    return this.http.get<Result<Estado>>(this.urlEstado+ idPais)
  }


  DeleteUsuario(usuario : UsuarioModel) : Observable<Result<UsuarioModel>>{
    return this.http.delete<Result<UsuarioModel>>(this.url + "/delete" + usuario.IdUsuario);

  }

  getMunicipios(idEstado: any): Observable<Result<Municipio>>{
    return this.http.get<Result<Municipio>>(this.urlMunicipio+ idEstado)
  }

  getColonia(idMunicipio: any): Observable<Result<Colonia>>{
    return this.http.get<Result<Colonia>>(this.urlColonia+ idMunicipio)
  }


  
}