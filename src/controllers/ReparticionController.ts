import { Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { ReparticionService } from '../services/ReparticionService';

let _reparticionService = container.get<ReparticionService>(Types.Reparticion);

const obtenerReparticiones = async(request: Request, response: Response) => {

    try {

        const reparticiones = await _reparticionService.obtenerReparticiones();

        if (!reparticiones) {
            response.status(404).json({
                'msg': 'No se encontró ninguna repartición'
            })
        } else {
            response.status(200).json(reparticiones)
        }
        
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo obtener las reparticiones'
        })
    }

}

export const ReparticionController = {
    obtenerReparticiones
}