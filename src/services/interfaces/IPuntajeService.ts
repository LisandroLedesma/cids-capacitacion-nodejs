import { Puntajes } from "../../entities/Puntajes";



export interface IPuntajeService {

    crearPuntaje(id_profesor: number, id_alumno: number, id_tema: number, data: any): Promise<any>
    
    modificarPuntaje(idProfesor: number, idAlumno: number, idTema: number, idPuntaje: number, data: any): Promise<any>
    
    listarPuntajesAlumno(cuil: string): Promise<any>

    obtenerPuntajes(): Promise<any>

    obtenerPuntajePorId(id: number): Promise<any>

    eliminarPuntaje(id: number): Promise<any>

}