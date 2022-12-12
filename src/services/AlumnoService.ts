import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { IAlumnoService } from "./interfaces/IAlumnoService";

import { Alumnos } from '../entities/Alumnos';
import { Reparticiones } from '../entities/Reparticiones';
import { Personas } from '../entities/Personas';

@injectable()
export class AlumnoService implements IAlumnoService{

    constructor() {}

    /**
     * Reutiliza el metodo para buscar a todos los alumnos, y filtra el arreglo buscando un
     * alumno en particular segun un ID
     * 
     * @params id - ID del alumno a buscar
     * 
     * @returns alumno con ese ID si existe, o null
     */
     public async obtenerAlumnoPorId(id: number): Promise<any> {

        try {

            const alumnos = await this.obtenerTodosLosAlumnos();
            //console.log(id);
            //console.log(alumnos);

            if (!alumnos) {
                return null;
            } else {
                const alumno = alumnos.filter((a:any) => a.idAlumno === id);
                return alumno[0]
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    
    /**
     * Busca a todos los alumnos, obteniendo solo el id de persona, implementado con getRepository
     * 
     * @returns arreglo de alumnos
     */
    public async obtenerTodosLosAlumnosGR(): Promise<Alumnos[]> {

        try {
            const alumnos = await getManager().getRepository(Alumnos).find()
            //console.log("Service: ", alumnos);
            return alumnos;
            

        } catch (error) {
            console.log(error);
            return null;
        }
    }


    /**
     * Busca a todos los alumnos, obteniendo datos de la persona, implementado con query builder
     * 
     * @returns arreglo de alumnos
     */
    public async obtenerTodosLosAlumnos(): Promise<any> {
        
        try {
            const alumnos = await getManager().
                                createQueryBuilder(Alumnos, "a").
                                leftJoinAndSelect("a.idPersona2", "p").
                                leftJoinAndSelect("a.idReparticion2", "r").
                                select([
                                    "a.idAlumno as idAlumno",
                                    "p.nombre as nombre",
                                    "p.apellido as apellido",
                                    "p.cuil as cuil",
                                    "p.edad as edad",
                                    "r.nombre as reparticion",
                                ]).
                                getRawMany();
            // idPersona2 => ver entitie, @join con persona
            return alumnos;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }


    /**
     * Reutiliza el metodo para buscar a todos los alumnos, y filtra el arreglo buscando un
     * alumno en particular segun un CUIL
     * 
     * @params cuil - CUIL del alumno a buscar
     * 
     * @returns alumno con ese CUIL si existe, o null
     */
    public async obtenerAlumnoPorCuil(cuil: string): Promise<any> {
        const alumnos = await this.obtenerTodosLosAlumnos();
        
        if (!alumnos) {
            return null;
        } else {
            const alumno = alumnos.filter((a:any) => a.persona_cuil === cuil);
            return alumno
        }
        // el codigo se ve raro, preguntar si puedo hacer alumnos?.filter directamente
        // creo que no, retornaria undefined, !== null
    }


    /**
     * Crea un alumno nuevo, no se envia el idAlumno, se asume que la persona fue creada
     * previamente, implemetacion con query builder
     * 
     * @params idReparticion - id de reparticion del alumno a crear
     * @params idPersona - id de persona del alumno a crear
     * 
     * @returns id del alumno si se creo, null si no
     */
    public async crearAlumno(idRep: number, idPer: number): Promise<any> {

        try {

            const persona: Personas = await getManager().getRepository(Personas).findOne({idPersona: idPer});

            const reparticion: Reparticiones = await getManager().getRepository(Reparticiones).findOne({idReparticion: idRep});;
            
            const res = await getManager()
                .createQueryBuilder()
                .insert()
                .into(Alumnos)
                .values([{
                    idPersona2: persona,
                    idReparticion2: reparticion
                }])
                .execute();
            
            const id = res.identifiers[0].idAlumno;

            return id;

        } catch (error) {
            console.log(error);
            return null;
        }

    }


    /**
     * Modifica un alumno segun un CUIL
     * 
     * @params cuil - CUIL del alumno a buscar
     * @params data - objetos con info a modificar
     * 
     * @returns alumno modificado, null si no se modificó
     */
    public async modificarAlumnoPorCuil(cuil: string, data:any): Promise<any> {

        try {
            const alumno = await getManager()
                 .getRepository(Alumnos)
                 .findOne({
                      relations: ["idPersona2"],
                      where: {
                           idPersona2: {
                                cuil,
                           },
                      },
                 });

            if (alumno) {
                 const persona = await getManager()
                      .getRepository(Personas)
                      .findOne(alumno.idPersona);

                 const personaActualizada = await getManager()
                      .getRepository(Personas)
                      .merge(persona, {
                           nombre: data.idPersona2.nombre,
                           apellido: data.idPersona2.apellido,
                           edad: data.idPersona2.edad,
                           cuil: data.idPersona2.cuil,
                      });

                 await getManager()
                      .getRepository(Personas)
                      .save(personaActualizada);

                 const alumnoActualizado = await getManager()
                      .getRepository(Alumnos)
                      .merge(alumno, {
                           idReparticion: data.idReparticion2,
                           idPersona: personaActualizada.idPersona,
                      });

                 return await getManager()
                      .getRepository(Alumnos)
                      .save(alumnoActualizado);
            } else {
                 return null;
            }
       } catch (error) {
            console.error(error);
            return null;
       }
        
    }

    /**
     * Modifica un alumno segun un CUIL
     * 
     * @params cuil - CUIL del alumno a buscar
     * @params data - objetos con info a modificar
     * 
     * @returns alumno modificado, null si no se modificó
     */
     public async modificarAlumnoPorId(id: number, data:any): Promise<any> {

        try {

            const alumnos = await this.obtenerTodosLosAlumnos();

            //console.log(alumnos);
            //console.log(id);
            const alumno = alumnos.filter((a:any) => a.idAlumno === id);
            
            //console.log(alumno);

            if (alumno) {
                 const persona = await getManager()
                      .getRepository(Personas)
                      .findOne(alumno.idPersona);

                 const personaActualizada = await getManager()
                      .getRepository(Personas)
                      .merge(persona, {
                           nombre: data.idPersona2.nombre,
                           apellido: data.idPersona2.apellido,
                           edad: data.idPersona2.edad,
                           cuil: data.idPersona2.cuil,
                      });

                 await getManager()
                      .getRepository(Personas)
                      .save(personaActualizada);

                 const alumnoActualizado = await getManager()
                      .getRepository(Alumnos)
                      .merge(alumno, {
                           idReparticion: data.idReparticion,
                           idPersona: personaActualizada.idPersona,
                      });

                 return await getManager()
                      .getRepository(Alumnos)
                      .save(alumnoActualizado);
            } else {
                 return null;
            }
       } catch (error) {
            console.error(error);
            return null;
       }
        
    }


    /**
     * Elimina un alumno segun un CUIL, tambien elimina la persona asociada
     * 
     * @params cuil - CUIL del alumno a eliminar
     * 
     * @returns true si se elimino, false si no
     */
    public async eliminarAlumnoPorCuil(cuil: string): Promise<any> {

        try {

            await getManager()
                .transaction(async () => {
                    const PersonasRepository = await getManager()
                        .getRepository(Personas);
                    let persona = await PersonasRepository.findOne({cuil: cuil});
                    //console.log(persona);
                    if (persona){
                        await getManager().createQueryBuilder()
                            .delete()
                            .from(Alumnos)
                            .where("alumnos.id_persona = :id", {
                                id: persona.idPersona
                            })
                            .execute();
    
                        await getManager().createQueryBuilder()
                            .delete()
                            .from(Personas)
                            .where("personas.cuil = :cuil", {
                                cuil: cuil
                            })
                            .execute();
    
                        return true;
                    }
                    return false;
                });

        } catch (error) {
            console.log(error);
            return false;
        }

    }
    
}