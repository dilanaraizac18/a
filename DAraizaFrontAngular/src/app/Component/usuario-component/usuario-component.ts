import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/usuario-services';
import {UsuarioModel } from '../../Interface/UsuarioModel';

@Component({
  selector: 'app-usuario-component',
  imports: [],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent implements OnInit{


public usuarios : UsuarioModel[] = [];

constructor (private usuarioService: UsuarioService){};

ngOnInit():void{
  this.GetAll();
}

GetAll(){
this.usuarioService.getAll().subscribe(
  data =>{
    this.usuarios = data.objects;
    console.log(data)
  }, error=>{

  }
);
}


}
