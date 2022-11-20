import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import {
    randSkill,
    randUserName,
    randEmail,
    randPassword,
    randNumber,
    randJobTitle,
    randFirstName,
    randJobArea,
    randLastName,
    randFilePath,
} from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Cv } from '../cv/entities/cv.entity';
import { CvService } from '../cv/cv.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const skillService = app.get(SkillService);
    const userService = app.get(UserService);
    const cvService = app.get(CvService);

    for (let i = 0; i < 50; i++) {
        const skill = new Skill();
        skill.designation = randSkill();
        await skillService.addskill(skill);

        const user = new User();
        user.username = randUserName();
        user.email = randEmail();
        user.password = randPassword();
        await userService.adduser(user);
    }
    for (let i = 0; i < 50; i++) {
        const cv = new Cv();
        cv.age = randNumber();
        cv.cin = randNumber();
        cv.job = randJobTitle();
        cv.firstname = randFirstName();
        cv.path = randFilePath();
        cv.name = randLastName();
        const randId = Math.floor(Math.random() * 48) + 1;
        const user = await userService.findOne(randId);
        cv.creator.id = Number(userService.findOne(randId));
        const skills = [];
        for (let j = 0; j < 3; j++) {
            const randId = Math.floor(Math.random() * 48) + 1;
            const skill = await skillService.findOne(randId);
            if (!skills.includes(skill)) {
                skills.push(skill);
            }
        }
        cv.skills = skills;
        cvService.addCv(cv);
    }
    await app.close();
}

bootstrap();