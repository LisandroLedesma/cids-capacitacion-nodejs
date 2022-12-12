import { Request, Response } from "express";
import container from '../services/inversify.config';
import Types from "../services/types/Types";
import { AlumnoService } from '../services/AlumnoService';

let _alumnoService = container.get<AlumnoService>(Types.Alumnos);

const obtenerTodosLosAlumnos = async(request: Request, response: Response) => {
    
    try {
        const alumnos = await _alumnoService.obtenerTodosLosAlumnos();
        //console.log("Controller: ",alumnos);
        if (!alumnos) {
            response.status(404).json({
                'msg': 'No se encontró ningún alumno'
            })
        } else {
            response.status(200).json(alumnos)
        }

    } catch (error) {
        console.log(error);
        response.status(409).json({
            error
        })
    }    
}

const obtenerAlumnoPorId = async (request: Request, response: Response) => {

    try {
        
        const id = +request.params.id

        const alumno = await _alumnoService.obtenerAlumnoPorId(id);

        if (!alumno) {
            response.status(404).json({
                'msg': `No se encontro ningun alumno con el cuil: ${id}`
            })
        } else {
            response.status(200).json(alumno)
        }

    } catch (error) {
        console.log(error);
        response.status(409).json(
            error
        )
    }

}

const obtenerAlumnoPorCuil = async(request: Request, response: Response) => {

    try {
        
        const cuil = request.params.cuil
        const alumno = await _alumnoService.obtenerAlumnoPorCuil(cuil);

        if (!alumno) {
            response.status(404).json({
                'msg': `No se encontro ningun alumno con el cuil: ${cuil}`
            })
        } else {
            response.status(200).json({
                alumno
            })
        }

    } catch (error) {
        console.log(error);
        response.status(409).json(
            error
        )
    }

}

const crearAlumno = async (request: Request, response: Response) => {
    try {
        
        const { idPersona, idReparticion } = request.body;
        
        const id = await _alumnoService.crearAlumno(idReparticion, idPersona);
        
        // duda => no deberia ser 201?
        if (id) {
            response.status(200).json(id)
        } else {
            response.status(409).json({
                'msg': 'No se pudo crear el alumno'
            })
        }
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo crear el alumno'
        })
    }
}

const modificarAlumnoPorCuil = async (request: Request, response: Response) => {
    
    try {
        const { cuil, data } = request.body;
        //console.log(data);

        const res = await _alumnoService.modificarAlumnoPorCuil(cuil, data);

        if (res) {
            response.status(200).json({
                'msg': 'Alumno modificado',
                res
            })
        }
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo modificar el alumno'
        })
    }

}

const modificarAlumnoPorId = async (request: Request, response: Response) => {
    try {
        const { id, data } = request.body;
        console.log("id: ", id);
        console.log("data: ", data);

        const res = await _alumnoService.modificarAlumnoPorId(id, data);

        if (res) {
            response.status(200).json({
                'msg': 'Alumno modificado',
                res
            })
        }
    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo modificar el alumno'
        })
    }
}

const eliminarAlumno = async (request: Request, response: Response) => {
    
    try {
        
        const cuil = request.body.cuil;
        //console.log(cuil);

        const res = await _alumnoService.eliminarAlumnoPorCuil(cuil);
        //console.log(res);
        response.status(200).json({
            'msg': 'Alumno eliminado',
        })
        

    } catch (error) {
        console.log(error);
        response.status(409).json({
            'msg': 'No se pudo eliminar el alumno'
        })
    }

}

export const AlumnoController = {
    obtenerTodosLosAlumnos,
    obtenerAlumnoPorCuil,
    crearAlumno,
    modificarAlumnoPorCuil,
    modificarAlumnoPorId,
    eliminarAlumno,
    obtenerAlumnoPorId
}