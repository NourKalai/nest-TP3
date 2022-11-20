import { User } from "src/user/entities/user.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Skill } from "src/skill/entities/skill.entity";

@Entity('Cv')
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    firstname: string;

    @Column()
    age: number;
    @Column()
    cin: number;
    @Column()
    job: string;
    @Column()
    path: string;

    @ManyToOne(() => User, user => user.cvs)
    creator: User;
    @ManyToMany(() => Skill, skill => skill.cvs)
    @JoinTable({
        name: 'cv_skills',
        joinColumn: {
          name: 'cv',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'skill',
          referencedColumnName: 'id',
        },
      })
    skills: Skill[];
}
