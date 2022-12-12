


export interface IAlumnoService {

    obtenerTodosLosAlumnosGR(): Promise<any>

    obtenerTodosLosAlumnos(): Promise<any>

    obtenerAlumnoPorCuil(cuil: string): Promise<any>

    obtenerAlumnoPorId(id: number): Promise<any>

    crearAlumno(idReparticion: number, idPersona: number): Promise<any>

    modificarAlumnoPorCuil(cuil: string, data: any): Promise<any>

    modificarAlumnoPorId(id: number, data: any): Promise<any>

    eliminarAlumnoPorCuil(cuil: string): Promise<any>
}