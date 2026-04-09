import { Colonia } from "./ColoniaModel";

export interface Direccion{
   idDireccion : number,
   Calle: string,
   NumeroInterior: string,
   NumeroExterior: string,
   colonia: Colonia
}