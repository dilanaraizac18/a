import { Component, inject } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario-services';
import { Pais } from '../../Interface/PaisModel';
import { Rol } from '../../Interface/RolModel';
import { Estado } from '../../Interface/EstadoModel';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm {
  public usuario: UsuarioModel | undefined;

  public paises: Pais[] = [];
  public roles: Rol[] = [];
  public estados : Estado [] = [];


  private formularioReactivo = inject(FormBuilder);

  constructor(private usuarioService: UsuarioService) { }

  public form: FormGroup = this.formularioReactivo.group({

    nombre: [''],
    apellidoPaterno: [''],
    apellidoMaterno: [''],
    numeroTelefonico: [''],
    fechaNacimiento: [''],
    CURP: [''],
    sexo: [''],
    username: [''],
    celular: [''],
    email: [''],
    password: ['']
  });

  enviarDatos() {

    this.usuario = this.form.value as UsuarioModel;
    this.usuarioService.add(this.usuario).subscribe({
      next: (data) => {
        if (data.Correct) {

          alert("Usuario insertado con exito");
        }
      }
    }
    );
  }

  ngOnInit(): void {
    this.GetPais();
    this.GetRol();
    // this.GetEstado();
  }

  GetPais() {
    this.usuarioService.getPais().subscribe(
      data => {
        this.paises = data.objects;
        console.log(data)
      }, error => {

      }
    )
  }

  GetRol(){
    this.usuarioService.getRol().subscribe(
      data =>{
        this.roles = data.objects;
        console.log(data)
      },error =>{

      }
      

    )
  }

  // GetEstado(){
  //   this.usuarioService.getEstado().subscribe(
  //     data =>{
  //       this.estados = data.objects;
  //       console.log(data);
  //     }, error =>{

  //     }
  //   )
  // }

  

}

