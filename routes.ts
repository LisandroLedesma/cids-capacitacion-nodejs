import { TemaController } from "./src/controllers/TemaController";
import { AlumnoController } from './src/controllers/AlumnoController';
import { PersonasController } from './src/controllers/PersonaController';
import { PuntajeController } from './src/controllers/PuntajeController';
import { ReparticionController } from './src/controllers/ReparticionController';
import { ProfesorController } from "./src/controllers/ProfesorController";
import { CargoController } from "./src/controllers/CargoController";
import { Schema } from './middlewares/ValdiationSchema';

export const AppRoutes = [
    // ************************ TEMAS ******************************************
    {
        path: "/temas",
        method: "get",
        action: TemaController.obtenerTemas,
        schema: Schema.schemaGenerico
    },
    {
        path: "/tema/:id",
        method: "get",
        action: TemaController.obtenerTemaPorId,
        schema: Schema.schemaGenerico
    },
    // ************************ ALUMNOS *****************************************
    {
        path: "/alumnos",
        method: "get",
        action: AlumnoController.obtenerTodosLosAlumnos,
        schema: Schema.schemaGenerico
    },
    {
        path: "/alumno/:cuil",
        method: "get",
        action: AlumnoController.obtenerAlumnoPorCuil,
        schema: Schema.schemaGenerico
    },
    {
        path: "/nuevoAlumno",
        method: "post",
        action: AlumnoController.crearAlumno,
        schema: Schema.schemaGenerico
    },
    {
        path: "/modificarAlumnoCuil",
        method: "put",
        action: AlumnoController.modificarAlumnoPorCuil,
        schema: Schema.schemaGenerico
    },
    {
        path: "/modificarAlumnoId",
        method: "put",
        action: AlumnoController.modificarAlumnoPorId,
        schema: Schema.schemaGenerico
    },
    {
        path: "/eliminarAlumno",
        method: "delete",
        action: AlumnoController.eliminarAlumno,
        schema: Schema.schemaGenerico
    },
    {
        path: "/alumnoId/:id",
        method: "get",
        action: AlumnoController.obtenerAlumnoPorId,
        schema: Schema.schemaGenerico
    },
    // ************************ PROFESORES **************************************
    {
        path: "/profesorId/:id",
        method: "get",
        action: ProfesorController.obtenerProfesorPorId,
        schema: Schema.schemaGenerico
    },
    {
        path: "/profesores",
        method: "get",
        action: ProfesorController.obtenerProfesores,
        schema: Schema.schemaGenerico
    },
    {
        path: "/crearProfesor",
        method: "post",
        action: ProfesorController.crearProfesor,
        schema: Schema.schemaGenerico
    },
    {
        path: "/modificarProfesor",
        method: "put",
        action: ProfesorController.modificarProfesorId,
        schema: Schema.schemaGenerico
    },
    {
        path: "/eliminarProfesor",
        method: "delete",
        action: ProfesorController.eliminarProfesorPorCUIL,
        schema: Schema.schemaGenerico
    },
    // ************************ PERSONAS ***************************************
    {
        path: "/crearPersona",
        method: "post",
        action: PersonasController.crearPersona,
        schema: Schema.schemaGenerico
    },
    {
        path: "/modificarPersona",
        method: "put",
        action: PersonasController.modificarPersona,
        schema: Schema.schemaGenerico
    },
    {
        path: "/eliminarPersona",
        method: "delete",
        action: PersonasController.eliminarPersona,
        schema: Schema.schemaGenerico
    },
    {
        path: "/obtenerPersonas",
        method: "get",
        action: PersonasController.obtenerPersona,
        schema: Schema.schemaGenerico
    },
    // ************************ PUNTAJES ***************************************
    {
        path: "/crearPuntaje",
        method: "post",
        action: PuntajeController.crearPuntaje,
        schema: Schema.schemaGenerico
    },
    {
        path: "/modificarPuntaje",
        method: "put",
        action: PuntajeController.modificarPuntaje,
        schema: Schema.schemaGenerico
    },
    {
        path: "/obtenerPuntajesAlumno/:cuil",
        method: "get",
        action: PuntajeController.obtenerPuntajesAlumno,
        schema: Schema.schemaGenerico
    },
    {
        path: "/obtenerPuntajes",
        method: "get",
        action: PuntajeController.obtenerPuntajes,
        schema: Schema.schemaGenerico
    },
    {
        path: "/obtenerPuntajesCompleto",
        method: "get",
        action: PuntajeController.obtenerPuntajeCompleto,
        schema: Schema.schemaGenerico
    },
    {
        path: "/obtenerPuntajesCompletoId/:id",
        method: "get",
        action: PuntajeController.obtenerPuntajeCompletoId,
        schema: Schema.schemaGenerico
    },
    {
        path: "/eliminarPuntaje",
        method: "delete",
        action: PuntajeController.eliminarPuntaje,
        schema: Schema.schemaGenerico
    },
    // ************************ REPARTICIONES ***********************************
    {
        path: "/obtenerReparticiones",
        method: "get",
        action: ReparticionController.obtenerReparticiones,
        schema: Schema.schemaGenerico
    },
        // ************************ CARGOS **************************************
    {
        path: "/obtenerCargos",
        method: "get",
        action: CargoController.obtenerCargos,
        schema: Schema.schemaGenerico
    },
]