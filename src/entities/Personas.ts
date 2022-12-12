import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alumnos } from "./Alumnos";
import { Profesores } from "./Profesores";

@Index("cuil_UNIQUE", ["cuil"], { unique: true })
@Index("IDX_1535e499bbd5547ffaea0bd201", ["cuil"], { unique: true })
@Entity("personas", { schema: "capacitacion" })
export class Personas {
  @PrimaryGeneratedColumn({ type: "int", name: "id_persona" })
  idPersona: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @Column("varchar", { name: "apellido", nullable: true, length: 45 })
  apellido: string | null;

  @Column("int", { name: "edad", nullable: true })
  edad: number | null;

  @Column("varchar", { name: "cuil", unique: true, length: 45 })
  cuil: string;

  @OneToMany(() => Alumnos, (alumnos) => alumnos.idPersona2)
  alumnos: Alumnos[];

  @OneToMany(() => Profesores, (profesores) => profesores.idPersona2)
  profesores: Profesores[];
}
