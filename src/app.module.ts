import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { User } from './user/entities/user.entity';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'aymen',
      password: 'aymenaymen',
      database: 'tp3',
      // autoLoadEntities: true,
      entities: [Cv, Skill,User],

      synchronize: true,
      logging: true,
      extra: {
        trustServerCertificate: true,
      }
    }),
    CvModule,
    SkillModule,
    UserModule,
    PremierModule,
    TodoModule,],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
