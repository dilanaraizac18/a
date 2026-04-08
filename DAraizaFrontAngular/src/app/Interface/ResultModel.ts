export interface Result<T>{
    Correct : boolean,
    errorMesaje: string,
    ex : any,
    object: T,
    objects : T []
}