import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { IProfesorService } from './interfaces/IProfesorService';

import { Profesores } from '../entities/Profesores';
import { Personas } from '../entities/Personas';
import { Cargos } from '../entities/Cargos';

@injectable()
export class ProfesorService implements IProfesorService{

    constructor() {}
    /**
     * Crea un profesor nuevo, no se envia el idProfesor, se asume que la 
     * persona fue creada previamente, implemetacion con query builder
     * 
     * @params idCargo - id del cargo del profesor a crear
     * @params idPersona - id de persona del profesor a crear
     * 
     * @returns id del profesor si se creo, null si no
     */
    public async crearProfesor(idCarg: number, idPer: number): Promise<any> {

        try {

            const persona: Personas = await getManager().getRepository(Personas).findOne({idPersona: idPer});

            const cargo: Cargos = await getManager().getRepository(Cargos).findOne({idCargo: idCarg});;
            
            const res = await getManager()
                .createQueryBuilder()
                .insert()
                .into(Profesores)
                .values([{
                    idPersona2: persona,
                    idCargo2: cargo
                }])
                .execute();
            //console.log(res);
            const id = res.raw.insertId;

            return id;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Modifica un profesor segun un ID
     * 
     * @params id - id del profesor a buscar
     * @params data - objetos con info a modificar
     * 
     * @returns profesor modificado, null si no se modificó
     */
    public async modificarProfesorPorId(id: number, data: any): Promise<any> {

        try {

            const nuevoProfesor = await getManager()
                        .getRepository(Profesores)
                        .findOne({idProfesor: id})
            
            const nuevaPersona = await getManager()
                        .getRepository(Personas)
                        .findOne({idPersona: nuevoProfesor.idPersona})
            
            const cargo = await getManager()
                        .getRepository(Cargos)
                        .findOne(data.idCargo2);
            
            nuevaPersona.nombre = data.idPersona2.nombre
            nuevaPersona.apellido = data.idPersona2.apellido
            nuevaPersona.edad = data.idPersona2.edad
            nuevaPersona.cuil = data.idPersona2.cuil
            nuevoProfesor.idCargo2 = cargo

            await getManager().getRepository(Personas)
                    .save(nuevaPersona);

            return await getManager().getRepository(Profesores)
                .save(nuevoProfesor);

       } catch (error) {
            console.error(error);
            return null;
       }

    }

    /**
     * Elimina un profesor segun un CUIL, tambien elimina la persona asociada
     * 
     * @params cuil - CUIL del profesor a eliminar
     * 
     * @returns true si se elimino, false si no
     */
    public async eliminarProfesorPorCuil(cuil: string): Promise<any> {

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
                            .from(Profesores)
                            .where("profesores.id_persona = :id", {
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
    
                    }
                });
                return true
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
     * Busca y retorna todos los profesores, incluyendo los datos de la 
     * persona asociada
     * 
     * @returns lista de profesores si es posible, null si no lo es.
     */
    public async obtenerProfesores(): Promise<any> {
        try {
            const profesores = await getManager().
                                createQueryBuilder(Profesores, "pr").
                                leftJoinAndSelect("pr.idPersona2", "p").
                                leftJoinAndSelect("pr.idCargo2", "c").
                                select([
                                    "pr.idProfesor as idProfesor",
                                    "p.nombre as nombre",
                                    "p.apellido as apellido",
                                    "p.cuil as cuil",
                                    "p.edad as edad",
                                    "c.nombre as cargo",
                                ]).
                                getRawMany();
            return profesores;
            
        } catch (error) {
            console.log(error);
            return null;
        }    }

    /**
     * Busca y retorna un profesor según un id, incluyendo los datos de la 
     * persona asociada
     * 
     * @params id - ID del profesor a buscar
     * 
     * @returns profesor con ese ID si existe, o null
     */
     public async obtenerProfesorPorId(id: number): Promise<any> {

        try {
            
            const profesores = await getManager().
                                createQueryBuilder(Profesores, "pr").
                                leftJoinAndSelect("pr.idPersona2", "p").
                                leftJoinAndSelect("pr.idCargo2", "c").
                                select([
                                    "pr.idProfesor as idProfesor",
                                    "p.nombre as nombre",
                                    "p.apellido as apellido",
                                    "p.cuil as cuil",
                                    "p.edad as edad",
                                    "c.nombre as cargo",
                                ]).
                                getRawMany();
            //console.log(profesores);
            if (!profesores) {
                return null;
            } else {
                const profesor = profesores
                                .filter((p:any) => p.idProfesor === id);
                //console.log(profesor[0]);
                return profesor[0]
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }

}