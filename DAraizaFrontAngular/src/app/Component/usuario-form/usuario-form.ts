import { Component, inject } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario-services';
import { Pais } from '../../Interface/PaisModel';
import { Rol } from '../../Interface/RolModel';
import { Estado } from '../../Interface/EstadoModel';
import { Municipio } from '../../Interface/MunicipioModel';
import { Colonia } from '../../Interface/ColoniaModel';

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
  public municipios: Municipio [] = [];
  public colonias: Colonia [] = [];
    public identificador: number | undefined;



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
 cambioPais(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.identificador = +selectElement.value;
    console.log('ID seleccionado:', selectElement.value);
    this.GetEstado();
    //this.getEstados(this.identificador);
  };

  GetEstado(){
    this.usuarioService.getEstado(this.identificador).subscribe(
      data =>{
        this.estados = data.objects;
        console.log(data);
      }, error =>{

      }
    )
  }

  cambioEstado(event: Event) {
    const optionEstado = event.target as HTMLSelectElement;
    this.identificador = +optionEstado.value;
    console.log("Id de estados: ", this.identificador);
    this.getMunicipios();

  }

  cambioMunicipio(event: Event) {
    const optionMunicipio = event.target as HTMLSelectElement;
    this.identificador = +optionMunicipio.value;
    console.log("Id de municipio: ", this.identificador);
    this.getColonia();
  }



  getMunicipios() {
    this.usuarioService.getMunicipios(this.identificador).subscribe(
      data => {
        console.log(data);
        this.municipios = data.objects;
      }
    )
  }

  getColonia() {
    this.usuarioService.getColonia(this.identificador).subscribe(
      data => {
        console.log(data);
        this.colonias = data.objects;
      }
    )

  

}
}

