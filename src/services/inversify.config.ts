import { Container } from "inversify";
import Types from "./types/Types";

import { ITemaService } from './interfaces/ITemaService';
import { IPersonaService } from './interfaces/IPersonaService';
import { IAlumnoService } from './interfaces/IAlumnoService';
import { IPuntajeService } from './interfaces/IPuntajeService';
import { IReparticionService } from "./interfaces/IReparticionService";
import { IProfesorService } from './interfaces/IProfesorService';

import { TemasService } from "./TemaService";
import { AlumnoService } from './AlumnoService';
import { PersonasService } from './PersonaService';
import { PuntajeService } from './PuntajeService';
import { ReparticionService } from './ReparticionService';
import { ProfesorService } from './ProfesorService';
import { ICargoService } from './interfaces/ICargoService';
import { CargoService } from './CargoService';

let container = new Container();

container.bind<ITemaService>(Types.Tema).to(TemasService);

container.bind<IAlumnoService>(Types.Alumnos).to(AlumnoService);

container.bind<IPersonaService>(Types.Personas).to(PersonasService);

container.bind<IPuntajeService>(Types.Puntaje).to(PuntajeService);

container.bind<IReparticionService>(Types.Reparticion).to(ReparticionService);

container.bind<IProfesorService>(Types.Profesor).to(ProfesorService);

container.bind<ICargoService>(Types.Cargos).to(CargoService);

export default container;