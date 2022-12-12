import { Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { TemasService } from '../services/TemaService';

let _temaService = container.get<TemasService>(Types.Tema);

const obtenerTemas = async(request: Request, response: Response) => {
    
    try {
        const temas = await _temaService.obtenerTodosLosTemas();

        if(!temas){
            response.status(404).json({
                'msg': 'No se encontró ningun tema'
            })
        } else{
            response.status(200).json(temas)
        }
        
    } catch (error) {
        response.status(409).json({ //409: Conflict
            error
        })
    }
}
const obtenerTemaPorId = async(request: Request, response: Response) => {

    try {
        const id: number = +request.params.id;
        const tema = await _temaService.obtenerTemaPorId(id);

        if (!tema) {
            response.status(404).json({
                'msg': `No se encontró ningun tema con el id: ${id}`
            })
        } else {
            response.status(200).json(tema)
        }
        
    } catch (error) {
        response.status(409).json({
            error
        })
    }
}

export const TemaController = {
    obtenerTemas,
    obtenerTemaPorId
}