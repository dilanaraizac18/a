import { Routes } from '@angular/router';
import { UsuarioComponent } from './Component/usuario-component/usuario-component';
import { UsuarioForm } from './Component/usuario-form/usuario-form';
import { GetByIdComponent } from './Component/get-by-id-component/get-by-id-component';

export const routes: Routes = [
    {path:"", component:UsuarioComponent},
    {path:"form", component:UsuarioForm},
    {path:"details/:idUsuario", component:GetByIdComponent}
];
