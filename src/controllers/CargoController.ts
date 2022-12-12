import { Request, Response } from 'express';
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { CargoService } from '../services/CargoService';

let _cargoService = container.get<CargoService>(Types.Cargos);

const obtenerCargos = async(request: Request, response: Response) => {
    try {
        
        const cargos = await _cargoService.obtenerCargos();

        if (!cargos) {
            response.status(404).json({
                'msg': 'No se encontró ningún cargo',
                cargos
            })
        } else {
            response.status(200).json(cargos)
        }

    } catch (error) {
        response.status(409).json({
            'msg': 'Error al obtener los cargos',
            error
        })
    }
}

export const CargoController = {
    obtenerCargos
}