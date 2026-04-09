import { Routes } from '@angular/router';
import { UsuarioComponent } from './Component/usuario-component/usuario-component';
import { UsuarioForm } from './Component/usuario-form/usuario-form';

export const routes: Routes = [
    {path:"", component:UsuarioComponent},
    {path:"form", component:UsuarioForm}
];
