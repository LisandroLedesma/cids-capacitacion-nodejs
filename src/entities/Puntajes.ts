import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alumnos } from "./Alumnos";
import { Profesores } from "./Profesores";
import { Temas } from "./Temas";

@Index("FK_PUNTAJE_ALUMNO_idx", ["idAlumno"], {})
@Index("FK_PUNTAJE_PROFESOR_idx", ["idProfesor"], {})
@Index("FK_PUNTAJE_TEMA_idx", ["idTema"], {})
@Entity("puntajes", { schema: "capacitacion" })
export class Puntajes {
  @PrimaryGeneratedColumn({ type: "int", name: "id_puntaje" })
  idPuntaje: number;

  @Column("int", { primary: true, name: "id_alumno" })
  idAlumno: number;

  @Column("int", { primary: true, name: "id_profesor" })
  idProfesor: number;

  @Column("int", { primary: true, name: "id_tema" })
  idTema: number;

  @Column("int", { name: "interes", nullable: true })
  interes: number | null;

  @Column("int", { name: "complejidad", nullable: true })
  complejidad: number | null;

  @Column("int", { name: "entendimiento", nullable: true })
  entendimiento: number | null;

  @Column("int", { name: "valoracion", nullable: true })
  valoracion: number | null;

  @Column("varchar", { name: "observaciones", nullable: true, length: 500 })
  observaciones: string | null;

  @ManyToOne(() => Alumnos, (alumnos) => alumnos.puntajes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_alumno", referencedColumnName: "idAlumno" }])
  idAlumno2: Alumnos;

  @ManyToOne(() => Profesores, (profesores) => profesores.puntajes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_profesor", referencedColumnName: "idProfesor" }])
  idProfesor2: Profesores;

  @ManyToOne(() => Temas, (temas) => temas.puntajes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_tema", referencedColumnName: "idTema" }])
  idTema2: Temas;
}
