import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UsuarioModel } from '../Interface/UsuarioModel';
import { Result } from '../Interface/ResultModel';

@Injectable({
  providedIn: 'root',

})
export class UsuarioService{
  private url: string = "http://localhost:8080/demo/api";

  constructor (private http : HttpClient){ }

  getAll(): Observable<Result<UsuarioModel>>{
    return this.http.get<Result<UsuarioModel>>(this.url);
  } 
}