import { Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { ProfesorService } from '../services/ProfesorService';

let _profesoresService = container.get<ProfesorService>(Types.Profesor);

const obtenerProfesorPorId = async(request: Request, response: Response) => {
    try {
        
        const id = +request.params.id

        const profesor = await _profesoresService.obtenerProfesorPorId(id);

        if (!profesor) {
            response.status(404).json({
                'msg': 'No se encontró ningún profesor'
            })
        } else {
            response.status(200).json(profesor)
        }

    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'Hubo un error al obtener los profesores.',
            error
        });
    }
}

const obtenerProfesores = async(request: Request, response: Response) => {
    try {
        
        const profesores = await _profesoresService.obtenerProfesores();

        if (!profesores) {
            response.status(404).json({
                'msg': 'No se encontró ningún profesor'
            })
        } else {
            response.status(200).json(profesores)
        }
        
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'Hubo un error al obtener los profesores.',
            error
        });
    }
}

const crearProfesor = async (request: Request, response: Response) => {
    try {
        
        const { idPersona, idCargo } = request.body;
        
        const id = await _profesoresService.crearProfesor(idCargo, idPersona);
        
        if (id) {
            response.status(200).json(id)
        } else {
            response.status(409).json({
                'msg': 'No se pudo crear el profesor'
            })
        }
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo crear el profesor'
        })
    }
}

const modificarProfesorId = async (request: Request, response: Response) => {
    try {

        const { idProfesor, data } = request.body;

        const res = await _profesoresService.modificarProfesorPorId(idProfesor, data);

        if (res) {
            response.status(200).json({
                'msg': 'Profesor modificado',
                res
            })
        }
        
    } catch (error) {
        response.status(409).json({
            'msg': 'Error al modificar el profesor',
            error
        })
    }
}

const eliminarProfesorPorCUIL = async (request: Request, response: Response) => {
    try {
        
        const cuil = request.body.cuil;

        const res = await _profesoresService.eliminarProfesorPorCuil(cuil);

        if (res) {
            response.status(200).json({
                'msg': 'Profesor eliminado correctamente'
            })
        }

    } catch (error) {
        response.status(409).json({
            'msg': 'No se pudo eliminar el profesor',
            error
        })
    }
}

export const ProfesorController = {
    obtenerProfesorPorId,
    obtenerProfesores,
    crearProfesor,
    modificarProfesorId,
    eliminarProfesorPorCUIL
}