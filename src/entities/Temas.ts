import { Column, Entity, OneToMany } from "typeorm";
import { Puntajes } from "./Puntajes";

@Entity("temas", { schema: "capacitacion" })
export class Temas {
  @Column("int", { primary: true, name: "id_tema" })
  idTema: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 45 })
  descripcion: string | null;

  @Column("varchar", { name: "duracion", nullable: true, length: 45 })
  duracion: string | null;

  @OneToMany(() => Puntajes, (puntajes) => puntajes.idTema2)
  puntajes: Puntajes[];
}
