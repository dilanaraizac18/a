import { Component,  inject, Input, input, signal } from '@angular/core';
import { UsuarioComponent } from '../usuario-component/usuario-component';
import { UsuarioService } from '../../Service/usuario-services';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { Direccion } from '../../Interface/DireccionModel';
import { Pais } from '../../Interface/PaisModel';
import { Estado } from '../../Interface/EstadoModel';
import { Municipio } from '../../Interface/MunicipioModel';
import { Colonia } from '../../Interface/ColoniaModel';
import { Rol } from '../../Interface/RolModel';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-get-by-id-component',
  imports: [],
  templateUrl: './get-by-id-component.html',
  styleUrl: './get-by-id-component.css',
})
export class GetByIdComponent {

private formularioReactivo = inject(FormBuilder)

  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  public usuario: UsuarioModel | undefined;
  public direcciones: Direccion | undefined;
  public paises: Pais [] = [];
  public estados: Estado [] = [];
  public municipios: Municipio [] = [];
  public colonias: Colonia [] = [];
  public roles: Rol [] = [];
  public identificador: number | undefined;
  public imagenSeleccionada: File | undefined;


  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const idUsuario = params['idUsuario'];
    this.getById(idUsuario);
  });
}


public form: FormGroup = this.formularioReactivo.group({
  Direcciones: this.formularioReactivo.array([
    this.crearDirecciones()
  ])
});

crearDirecciones(): FormGroup{
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



  public formupdtadeImg: FormGroup = this.formularioReactivo.group({
    Imagen : [''] 
  });


  getById(idUsuario: number){
    this.usuarioService.getById(idUsuario).subscribe(
      data =>{
        console.log(data);
        this.usuario = data.object;

      }, error =>{
        console.log("ERROR getById");
      }
    )
  }

  deleteDireccion(idDireccion: number){
    this.usuarioService.deleteDireccion(idDireccion).subscribe(
      data =>{
        this.direcciones = data.object;
        console.log(data);
      }, error=>{

      }

    )

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



  
  imagenCargada(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.imagenSeleccionada = file;
    console.log("Imagen cargada:", file);
  }
}

  updateImagen(idusuario : any) {

    
  const formData = new FormData();
  formData.append("imagen", this.imagenSeleccionada as File);

    this.usuarioService.updateImagen(idusuario,formData).subscribe({
      next: (data) => {
        if (data.Correct) {

          alert("Usuario insertado con exito");
        }
      }
    }
    );
  }


}
