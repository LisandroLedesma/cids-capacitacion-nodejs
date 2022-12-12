


export interface ITemaService {

    obtenerTodosLosTemas(): Promise<any>

    obtenerTemaPorId(id: number): Promise<any>
}