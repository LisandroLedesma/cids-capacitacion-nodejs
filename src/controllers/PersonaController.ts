import { Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { PersonasService } from '../services/PersonaService';

let _personaService = container.get<PersonasService>(Types.Personas);

const crearPersona = async (request:Request, response: Response) => {

    try {

        const data = request.body;

        const id = await _personaService.crearPersona(data);

        if (!id) {
            response.status(409).json({
                'msg': 'No se pudo crear la persona'
            })
        } else {
            response.status(200).json(id)
        }
        
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo crear la persona',
            'error': error
        })
    }

}

const modificarPersona = async (request:Request, response: Response) => {
    
    try {

        const data = request.body;
        const cuil = request.body.cuil;

        const personaMod = await _personaService.modificarPersona(cuil, data);

        if (personaMod) {
            response.status(200).json({
                'msg': 'Persona modificada con éxito',
                personaMod
            })
        } else {
            response.status(409).json({
                'msg': 'No se pudo modificar la persona'
            })
        }
        
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo modificar la persona',
            'error': error
        })
    }

}

const eliminarPersona = async (request:Request, response: Response) => {

    try {
        
        const cuil = request.body.cuil;

        const res = await _personaService.eliminarPersonaPorCuil(cuil);

        if (res) {
            response.status(200).json({
                'msg': 'Persona eliminada correctamente',
            })
        } else {
            response.status(409).json({
                'msg': 'No se pudo elimnar la persona',
            })
        }
            
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo elimnar la persona',
            'error': error
        })
    }
}

const obtenerPersona = async (request:Request, response: Response) => {

    try {
        
        const personas = await _personaService.buscarPersonas();

        if (personas) {
            response.status(200).json(personas)
        } else {
            response.status(404).json({
                'msg': 'No se encontró ninguna persona'
            })
        }

    } catch (error) {
        console.log(error);
        response.status(409).json(error)
    }

}

export const PersonasController = {
    crearPersona,
    modificarPersona,
    eliminarPersona,
    obtenerPersona
}