import { injectable } from "inversify";
import {getManager} from 'typeorm';

import { Reparticiones } from '../entities/Reparticiones';
import { IReparticionService } from './interfaces/IReparticionService';

@injectable()
export class ReparticionService implements IReparticionService{

    public async obtenerReparticiones(): Promise<any> {

        try {
            
            const reparticiones = await getManager().
                                        getRepository(Reparticiones).
                                        find();
            
            return reparticiones;

        } catch (error) {
            console.log(error);
            return null;
        }

    }   
}