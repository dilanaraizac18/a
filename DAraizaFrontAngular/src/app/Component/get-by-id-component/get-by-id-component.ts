import { Component,  inject, Input, input, signal } from '@angular/core';
import { UsuarioComponent } from '../usuario-component/usuario-component';
import { UsuarioService } from '../../Service/usuario-services';
import { ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../../Interface/UsuarioModel';


@Component({
  selector: 'app-get-by-id-component',
  imports: [],
  templateUrl: './get-by-id-component.html',
  styleUrl: './get-by-id-component.css',
})
export class GetByIdComponent {

  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  public usuario: UsuarioModel | undefined;
  
  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const idUsuario = params['idUsuario'];
    this.getById(idUsuario);
  });
}
  //@Input() idUsuario: number | undefined;


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
}
