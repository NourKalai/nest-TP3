import { Cv } from "src/cv/entities/cv.entity";
import { ManyToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity('Skill')
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    designation: string;
    @ManyToMany(() => Cv, cv => cv.skills)
    cvs: Cv[];
}
