import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { ITemaService } from './interfaces/ITemaService';
import { Temas } from '../entities/Temas';

@injectable()
export class TemasService implements ITemaService {

    constructor(){}

    /**
     * Busca todos los temas en la BD, implementado con getRawMany
     * 
     * @returns arreglo de temas
     */
    public async obtenerTodosLosTemas(): Promise<Temas[]> {

        try {

            const temas: any = await getManager()
                .createQueryBuilder(Temas, "t")
                .addSelect("t.idTema", "id")
                .addSelect("t.nombre", "nombre")
                .addSelect("t.descripcion", "descripcion")
                .addSelect("t.duracion", "duracion")
                .orderBy("t.idTema", "ASC")
                .getRawMany();
            
            return temas;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Busca un tema por su id, implementado con getRepository
     * 
     * @param id - id del tema a buscar
     * 
     * @returns arreglo de temas
     */
    public async obtenerTemaPorId(id: number): Promise<any> {

        try {
            const tema = await getManager().getRepository(Temas).findOne(id);
            return tema;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
}