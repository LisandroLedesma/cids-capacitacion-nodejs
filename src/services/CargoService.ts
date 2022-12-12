import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { Cargos } from "../entities/Cargos";

import { ICargoService } from './interfaces/ICargoService';

@injectable()
export class CargoService implements ICargoService {

    constructor() {}
    
    /**
     * Busca y retorna todos los cargos
     * 
     * @returns arreglo de cargos si los encuentra, null en caso contrario.
     */
    public async obtenerCargos(): Promise<any> {

        try {

            const cargos = await getManager().
                        getRepository(Cargos).
                        find();
            
            return cargos;
            
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    
}