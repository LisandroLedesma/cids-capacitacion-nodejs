


export interface IPersonaService {

    crearPersona(data: any): Promise<any>
    
    modificarPersona(cuil:string, data: any): Promise<any>
    
    eliminarPersonaPorCuil(cuil: string): Promise<any>

    buscarPersonas(): Promise<any>

    buscarPersonaPorId(): Promise<any>

    buscarPersonaPorCuil(): Promise<any>

}