import { Component, inject } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario-services';
import { Pais } from '../../Interface/PaisModel';
import { Rol } from '../../Interface/RolModel';
import { Estado } from '../../Interface/EstadoModel';
import { Municipio } from '../../Interface/MunicipioModel';
import { Colonia } from '../../Interface/ColoniaModel';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm {
  public usuario: UsuarioModel | undefined;

  public paises: Pais[] = [];
  public roles: Rol[] = [];
  public estados: Estado[] = [];
  public municipios: Municipio[] = [];
  public colonias: Colonia[] = [];
  public identificador: number | undefined;
  public imagenSeleccionada: File | null = null;


  private formularioReactivo = inject(FormBuilder);

  constructor(private usuarioService: UsuarioService) { }

  public form: FormGroup = this.formularioReactivo.group({

    Nombre: [''],
    ApellidoPaterno: [''],
    ApellidoMaterno: [''],
    NumeroTelefonico: [''],
    FechaNacimiento: [''],
    CURP: [''],
    Sexo: [''],
    Username: [''],
    Celular: [''],
    Email: [''],
    Password: [''],

    Rol: this.formularioReactivo.group({
      idRol: ['']
    }),

    Direcciones: this.formularioReactivo.array([
      this.crearDireccion()
    ])
  });

  crearDireccion(): FormGroup {
    return this.formularioReactivo.group({
      
        idDireccion: [0],
      Calle: [''],
      NumeroInterior: [''],
      NumeroExterior: [''],

      colonia: this.formularioReactivo.group({
        idColonia: [''],
        municipio: this.formularioReactivo.group({
          idMunicipio: [''],
          estado: this.formularioReactivo.group({
            idEstado: [''],
            pais: this.formularioReactivo.group({
              idPais: ['']
            })

          })
        })
      })

    })


  }

enviarDatosform(){
  console.log(this.form.value)
}


 imagenCargada(event: any) {
    if (event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    }
  }
  enviarDatos() {

    this.usuario = this.form.value as UsuarioModel;
    this.usuario.Status = 1;
    this.usuarioService.add(this.usuario,this.imagenSeleccionada).subscribe({
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

  GetRol() {
    this.usuarioService.getRol().subscribe(
      data => {
        this.roles = data.objects;
        console.log(data)
      }, error => {

      }


    )
  }
  cambioPais(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.identificador =+ selectElement.value;
    console.log('ID seleccionado:', selectElement.value);
    this.GetEstado();
    //this.getEstados(this.identificador);
  };

  GetEstado() {
    this.usuarioService.getEstado(this.identificador).subscribe(
      data => {
        this.estados = data.objects;
        console.log(data);
      }, error => {

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

