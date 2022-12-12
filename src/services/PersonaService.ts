import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { IPersonaService } from './interfaces/IPersonaService';
import { Personas } from '../entities/Personas';



@injectable()
export class PersonasService implements IPersonaService{

    constructor() {}
    
    /**
     * Crea una persona nueva, implemetacion con query builder
     * 
     * @params data - objeto con la información para crear la persona
     * 
     * @returns id de la persona creada, null en caso contrario
     */
    public async crearPersona(data: any): Promise<any> {
        
        try {

            const {nombre, apellido, edad, cuil} = data;

            const res = await getManager().createQueryBuilder()
                .insert()
                .into(Personas)
                .values({
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    cuil: cuil
                })
                .execute();
            
            //console.log(id);
            
            const id = res.identifiers[0].idPersona;

            return id;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    /**
     * Modificar una persona segun un cuil
     * 
     * @params cuil - cuil de la persona a modificar
     * @params data - objeto con la información para modificar la persona
     * 
     * @returns persona modificada, null si no se modifico
     */
    public async modificarPersona(cuil:string, data: any): Promise<any> {

        try {

            const persona = await getManager()
                      .getRepository(Personas)
                      .findOne({cuil: cuil});
            
            if (!persona) {
                return null;
            } else {
                const personaActualizada = await getManager()
                      .getRepository(Personas)
                      .merge(persona, {
                           nombre: data.nombre,
                           apellido: data.apellido,
                           edad: data.edad,
                           cuil: data.cuil,
                      });

                 return await getManager()
                      .getRepository(Personas)
                      .save(personaActualizada);
            }
                 
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    /**
     * Elimina una persona segun un CUIL
     * 
     * @params cuil - CUIL de la persona a eliminar
     * 
     * @returns true si se elimino, false si no
     */
    public async eliminarPersonaPorCuil(cuil: string): Promise<any> {

        try {
            await getManager()
            .transaction(async () => {
                    const PersonasRepository = await getManager()
                        .getRepository(Personas);
                    let persona = await PersonasRepository.findOne({cuil: cuil});
                    if (persona){
                        await getManager().createQueryBuilder()
                            .delete()
                            .from(Personas)
                            .where("personas.cuil = :cuil", {
                                cuil: cuil
                            })
                            .execute();
    
                        return true;
                    } else {
                        return false;
                    }
                });
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    public async buscarPersonas(): Promise<any> {

        try {
            
            const personas = await getManager().
                                    getRepository(Personas).
                                    find();
            
            return personas;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

    public async buscarPersonaPorId(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async buscarPersonaPorCuil(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}