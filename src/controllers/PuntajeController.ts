import { request, Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { PuntajeService } from '../services/PuntajeService';

let _puntajeService = container.get<PuntajeService>(Types.Puntaje);

const crearPuntaje = async(request: Request, response: Response) => {

    try {
        
        const {idProfesor, idAlumno, idTema, data} = request.body;

        const puntajeCreado = await _puntajeService.crearPuntaje(idProfesor, idAlumno, idTema, data);

        if (puntajeCreado) {
            
            response.status(200).json({
                'msg': 'Puntaje creado correctamente'
            })

        } else {
            response.status(409).json({
                'msg': 'No se pudo crear el puntaje'
            })
        }

    } catch (error) {
        response.status(409).json({
            'msg': 'No se pudo crear el puntaje',
            'error': error
        })
    }

}

const modificarPuntaje = async(request: Request, response: Response) => {

    try {
        
        //console.log("Body: ", request.body);
        const {idProfesor, idAlumno, idTema, idPuntaje, data} = request.body;

        const puntajeCreado = await _puntajeService.modificarPuntaje(idProfesor, idAlumno, idTema, idPuntaje, data);

        if (puntajeCreado) {
            
            response.status(200).json({
                'msg': 'Puntaje modificado correctamente'
            })

        } else {
            response.status(409).json({
                'msg': 'No se pudo modificar el puntaje'
            })
        }

    } catch (error) {
        response.status(409).json({
            'msg': 'No se pudo modificar el puntaje',
            'error': error
        })
    }

}

const obtenerPuntajesAlumno = async(request: Request, response: Response) => {

    try {

        const cuil: string = request.params.cuil;

        const puntajes = await _puntajeService.listarPuntajesAlumno(cuil);

        if (!puntajes) {
            response.status(404).json({
                'msg': 'No se encontro ningún puntaje'
            })
        } else {
            response.status(200).json({
                puntajes
            })
        }
        
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se encontro ningún puntaje',
            'error': error
        })
    }

}

const obtenerPuntajes = async(request: Request, response: Response) => {

    try {
        
        const puntajes = await _puntajeService.obtenerPuntajes();

        if (!puntajes) {
            response.status(404).json({
                'msg': 'No se encontró ningún puntaje'
            })
        } else {
            response.status(200).json(puntajes)
        }

    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudieron obtener los puntajes',
            error
        })
    }
}

const obtenerPuntajeCompleto = async(request: Request, response: Response) => {
    try {
        const puntajes = await _puntajeService.obtenerPuntajesCompleto();

        if (!puntajes) {
            response.status(404).json({
                'msg': 'No se encontró ningún puntaje'
            })
        } else {
            response.status(200).json(puntajes)
        }

    } catch (error) {
        console.log(error);
        response.status(409).json(error)
    }
}

const obtenerPuntajeCompletoId = async(request: Request, response: Response) => {
    try {

        const id = +(request.params.id);
        const puntaje = await _puntajeService.obtenerPuntajePorId(id);

        if (!puntaje) {
            response.status(404).json({
                'msg': `No se encontro un puntaje con el id: ${id}`,
                puntaje
            });
        } else {
            response.status(200).json(puntaje);
        }

    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': `Error al buscar un puntaje con ese id`,
            error
        });
    }
}

const eliminarPuntaje = async(request: Request, response: Response) => {
    try {

        const id = +request.body.id
        // console.log("Request id: ", request.body.id);
        // console.log("Tipo: ", typeof(request.body.id));

        const res = await _puntajeService.eliminarPuntaje(id);
        
        if (res) {
            response.status(200).json({
                'msg': 'Puntaje eliminado correctamente'
            })
        } else {
            response.status(409).json({
                'msg': 'Error al eliminar el puntaje.'
            })
        }

    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'Error al eliminar el puntaje.',
            error
        })
    }
}

export const PuntajeController = {
    crearPuntaje,
    modificarPuntaje,
    obtenerPuntajesAlumno,
    obtenerPuntajes,
    obtenerPuntajeCompleto,
    obtenerPuntajeCompletoId,
    eliminarPuntaje
}