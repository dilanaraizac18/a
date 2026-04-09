import { Municipio } from "./MunicipioModel";

export interface Colonia{
    idColonia: number,
    Nombre: string,
    CodigoPostal: string,
    municipio: Municipio
}