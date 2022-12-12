export interface IProfesorService {

    obtenerProfesorPorId(id: number): Promise<any>

    obtenerProfesores(): Promise<any>

    crearProfesor(idCargo: number, idPersona: number): Promise<any>

    modificarProfesorPorId(id: number, data: any): Promise<any>

    eliminarProfesorPorCuil(cuil: string): Promise<any>
}