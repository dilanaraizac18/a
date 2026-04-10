 import { Direccion } from "./DireccionModel"
import { Rol } from "./RolModel"

export interface UsuarioModel{
    IdUsuario : number,
    Nombre : string,
    ApellidoPaterno: string,
    ApellidoMaterno: string
    CURP : string,
    Celular : string,
    Email : string,
    FechaNacimiento: Date,
    Imagen: string,
    NumeroTelefonico: string,
    Sexo : string,
    Status : number,
    Username: string,
    Roles: Rol [],
    Direcciones: Direccion []
}



    

