import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { IPuntajeService } from './interfaces/IPuntajeService';

import { Puntajes } from '../entities/Puntajes';
import {Alumnos} from "../entities/Alumnos";
import { Profesores } from '../entities/Profesores';
import {Temas} from "../entities/Temas";
import {Personas} from "../entities/Personas";

@injectable()
export class PuntajeService implements IPuntajeService{

    constructor() {}

    /**
    * Elimina un puntaje según su id
    * 
    * @param id - del puntaje a eliminar
    *  
    * @returns true si se elimino, false en caso contrario.
    */
    public async eliminarPuntaje(id: number): Promise<any> {

        try {
            
            await getManager()
            .transaction(async () => {
                    const PuntajesRepository = await getManager()
                        .getRepository(Puntajes);
                    let puntaje = await PuntajesRepository.findOne({idPuntaje: id});
                    if (puntaje){
                        await getManager().createQueryBuilder()
                            .delete()
                            .from(Puntajes)
                            .where("idPuntaje = :idP", {
                                idP: id
                            })
                            .execute();}
                    });
    
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
    * Busca todos los puntajes de un alumno según su CUIL
    * 
    * @param cuil - del alumno a buscar
    *  
    * @returns lista de puntajes, null si no encuentra nada.
    */
    public async obtenerPuntajePorId(id: number): Promise<any> {

        try {
            let puntajes = await getManager()
            .createQueryBuilder(Puntajes, "punt")
            .leftJoinAndSelect("punt.idAlumno2", "a")
            .leftJoinAndSelect("punt.idProfesor2", "prof")
            .leftJoinAndSelect("punt.idTema2", "t")
            .leftJoinAndSelect(
                 Personas,
                 "pers_a",
                 "pers_a.id_persona = a.id_persona"
            )
            .leftJoinAndSelect(
                 Personas,
                 "pers_prof",
                 "pers_prof.id_persona = prof.id_persona"
            )
            .select([
                 "punt.idPuntaje as idPuntaje",
                 "a.idAlumno as idAlumno",
                 "pers_a.nombre as nombreAlumno",
                 "pers_a.apellido as apellidoAlumno",
                 "prof.idProfesor as idProfesor",
                 "pers_prof.nombre as nombreProfesor",
                 "pers_prof.apellido as apellidoProfesor",
                 "t.idTema as idTema",
                 "t.nombre as tema",
                 "punt.interes as interes",
                 "punt.complejidad as complejidad",
                 "punt.entendimiento as entendimiento",
                 "punt.valoracion as valoracion",
                 "punt.observaciones as observaciones",
            ])
            .where("punt.idPuntaje = :id", { id: id })
            .getRawMany();

            //console.log(puntajes);
            return puntajes[0];
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    /**
    * Busca todos los puntajes
    *  
    * @returns lista de puntajes, null si no encuentra nada.
    */
    public async obtenerPuntajes(): Promise<any> {

        try {

            const puntajes = await getManager()
                                    .getRepository(Puntajes)
                                    .find();
            
            return puntajes;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    
    /**
    * Busca todos los puntajes, incluyendo la información de el alumno, el 
    * profesor y el tema asociados
    *  
    * @returns lista de puntajes, null si no encuentra nada.
    */
     public async obtenerPuntajesCompleto(): Promise<any> {

        try {

            let puntajes = await getManager()
            .createQueryBuilder(Puntajes, "punt")
            .leftJoinAndSelect("punt.idAlumno2", "a")
            .leftJoinAndSelect("punt.idProfesor2", "prof")
            .leftJoinAndSelect("punt.idTema2", "t")
            .leftJoinAndSelect(
                 Personas,
                 "pers_a",
                 "pers_a.id_persona = a.id_persona"
            )
            .leftJoinAndSelect(
                 Personas,
                 "pers_prof",
                 "pers_prof.id_persona = prof.id_persona"
            )
            .select([
                 "punt.idPuntaje as idPuntaje",
                 "pers_a.nombre as nombreAlumno",
                 "pers_a.apellido as apellidoAlumno",
                 "pers_prof.nombre as nombreProfesor",
                 "pers_prof.apellido as apellidoProfesor",
                 "t.nombre as tema",
                 "punt.interes as interes",
                 "punt.complejidad as complejidad",
                 "punt.entendimiento as entendimiento",
                 "punt.valoracion as valoracion",
                 "punt.observaciones as observaciones",
            ])
            .getRawMany();

            //console.log(puntajes);
            return puntajes;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    
    /**
    * Crea un nuevo puntaje con la info recibida en la request
    * 
    * @param idProfesor - para la PK compuesta del nuevo puntaje
    * @param idAlumno - para la PK compuesta del nuevo puntaje
    * @param idTema - para la PK compuesta del nuevo puntaje
    * @param data - objeto con la información necesaria para registrar un nuevo puntaje
    *  
    * @returns true si el puntaje creado, false si no se creo.
    */
    public async crearPuntaje( idProfesor: number, idAlumno: number, idTema: number, data: any ): Promise<any> { 
        
        try {
            await getManager()
                .transaction(async () => {

                    let nuevoPuntaje = new Puntajes()
                    await getManager()
                    const profesorRepository = await getManager()
                        .getRepository(Profesores);
                    const profesor = await profesorRepository.findOne(idProfesor);
                    const temaRepository = await getManager()
                        .getRepository(Temas);
                    const tema = await temaRepository.findOne(idTema);
                    const alumnoRepository = await getManager()
                        .getRepository(Alumnos);
                    const alumno = await alumnoRepository.findOne(idAlumno);

                    //nuevoPuntaje.idPuntaje = data.idPuntaje,
                    nuevoPuntaje.interes = +data.interes,
                    nuevoPuntaje.idProfesor2 = profesor,
                    nuevoPuntaje.idAlumno2 = alumno,
                    nuevoPuntaje.complejidad = +data.complejidad,
                    nuevoPuntaje.entendimiento = +data.entendimiento,
                    nuevoPuntaje.idTema2 = tema,
                    nuevoPuntaje.valoracion = +data.valoracion,
                    nuevoPuntaje.observaciones = data.observaciones


                    await getManager().transaction(async (transaccion) => {
                        await transaccion.save(nuevoPuntaje);
                    })
                    

                });
                return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
    * Modifica un puntaje con la info recibida en la request
    * 
    * @param idProfesor - para la PK compuesta del nuevo puntaje
    * @param idAlumno - para la PK compuesta del nuevo puntaje
    * @param idTema - para la PK compuesta del nuevo puntaje
    * @param data - objeto con la información necesaria para modificar el puntaje
    *  
    * @returns true si el puntaje modificado, false si no se modifico.
    */
    public async modificarPuntaje(id_profesor: number, id_alumno: number, id_tema: number, id_puntaje: number, data: any): Promise<any> {

        try {
            const puntajesRepo = getManager().getRepository(Puntajes)
            const puntaje = await puntajesRepo.findOne({
                idPuntaje: id_puntaje,
                idProfesor: id_profesor,
                idAlumno: id_alumno,
                idTema: id_tema
            });
            console.log(puntaje);
            //puntaje.idPuntaje
            puntaje.idProfesor = data.idProfesor
            puntaje.idAlumno = data.idAlumno
            puntaje.idTema = data.idTema
            puntaje.interes = data.interes
            puntaje.complejidad = data.complejidad
            puntaje.entendimiento = data.entendimiento
            puntaje.valoracion = data.valoracion
            puntaje.observaciones = data.observaciones

            await getManager()
                .transaction(async (funcion) => {
                    await funcion.save(puntaje);
                });
            
            return true;
            
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
    * Busca todos los puntajes de un alumno según su CUIL
    * 
    * @param cuil - del alumno a buscar
    *  
    * @returns lista de puntajes, null si no encuentra nada.
    */
    public async listarPuntajesAlumno(cuil: string): Promise<any> {

        try {
            const personaRepo = getManager().getRepository(Personas);
            let persona = await personaRepo.findOne({where: {cuil : cuil}});
 
            const alumnoRepo = getManager().getRepository(Alumnos);
            let alumno = await alumnoRepo.findOne({where: {idPersona : persona.idPersona}});
 
            const puntajeRepo = getManager().getRepository(Puntajes);
             let puntajes : Puntajes[] = await puntajeRepo.find({where: {idAlumno : alumno.idAlumno}})
             return puntajes;
        }
        catch (error) {
            console.error(error);
            return null;
        }

    }
}