import { Direccion } from "./DireccionModel"

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
    Direcciones: Direccion
}



    

