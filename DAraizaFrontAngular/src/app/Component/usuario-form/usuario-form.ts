import { Component, inject } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import {ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario-services';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm {
public usuario: UsuarioModel | undefined;

private formularioReactivo = inject(FormBuilder);

constructor (private usuarioService: UsuarioService){}

public form : FormGroup = this.formularioReactivo.group({

  nombre : [''],
  apellidoPaterno : [''],
  apellidoMaterno : [''],
  numeroTelefonico : [''],
  fechaNacimiento: [''],
  CURP : [''],
  sexo: [''],
  celular: [''],
  email: [''],
  password: ['']
});

enviarDatos(){

  this.usuario = this.form.value as UsuarioModel;
  this.usuarioService.add(this.usuario).subscribe({
    next:(data) =>{
      if(data.Correct) {

        alert("Usuario insertado con exito");
      }
    }
  }
  );
}




}
