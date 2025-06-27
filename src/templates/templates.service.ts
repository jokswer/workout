import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  EntityManager,
  In,
  IsNull,
  Repository,
} from 'typeorm';
import { SetsDto, TemplateDto } from './schemas/template.schema';
import { Template } from './entities/templates.entity';
import { TemplateExercise } from './entities/template_exercises.entity';
import { TemplateExercisesSets } from './entities/template_exercises_sets.entity';

type TShortTemplate = Pick<Template, 'id' | 'name' | 'description'>;
type TUserTemplateByIdArgs = {
  userId: string;
  templateId: string;
};
type TEditUserTemplateByIdArgs = TUserTemplateByIdArgs & {
  editTemplateDto: TemplateDto;
};

@Injectable()
export class TemplatesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  public async getAllUserTemplates(userId: string): Promise<TShortTemplate[]> {
    return await this.templateRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: { userId: userId ?? IsNull() },
    });
  }

  public getUserTemplateById({
    userId,
    templateId,
  }: TUserTemplateByIdArgs): Promise<Template | null> {
    return this.templateRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
        exercises: {
          id: true,
          position: true,
          sets: {
            id: true,
            position: true,
            defaultReps: true,
            defaultWeight: true,
            defaultTime: true,
          },
        },
      },
      relations: {
        exercises: {
          exercise: true,
          sets: true,
        },
      },
      where: {
        id: templateId ?? IsNull(),
        userId: userId ?? IsNull(),
      },
    });
  }

  public deleteUserTemplateById({
    userId,
    templateId,
  }: TUserTemplateByIdArgs): Promise<DeleteResult> {
    return this.templateRepository.delete({ id: templateId, userId });
  }

  public editUserTemplateById({
    userId,
    templateId,
    editTemplateDto,
  }: TEditUserTemplateByIdArgs) {
    return this.dataSource.transaction(async (manager) => {
      await this.editTemplate(manager, editTemplateDto, userId, templateId);
      await this.editTemplateExercises(manager, templateId, editTemplateDto);

      return manager.findOne(Template, {
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: { id: templateId, userId },
      });
    });
  }

  public createUserTemplate(
    dto: TemplateDto,
    userId: string,
  ): Promise<TShortTemplate | null> {
    return this.dataSource.transaction(async (manager) => {
      const template = await this.createTemplate(manager, dto, userId);
      const templateExercises = await this.createTemplateExercises(
        manager,
        template.id,
        dto,
      );
      await this.createTemplateExerciseSets(manager, templateExercises, dto);

      return manager.findOne(Template, {
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: { id: template.id, userId },
      });
    });
  }

  private async createTemplate(
    manager: EntityManager,
    dto: TemplateDto,
    userId: string,
  ): Promise<Template> {
    const template = manager.create(Template, {
      name: dto.name,
      description: dto.description,
      userId,
    });
    return await manager.save(template);
  }

  private async createTemplateExercises(
    manager: EntityManager,
    templateId: string,
    dto: TemplateDto,
  ): Promise<TemplateExercise[]> {
    const templateExercises = dto.exercises.map((ex) =>
      manager.create(TemplateExercise, {
        templateId,
        exerciseId: ex.exerciseId,
        position: ex.position,
      }),
    );

    return await manager.save(templateExercises);
  }

  private async createTemplateExerciseSets(
    manager: EntityManager,
    templateExercises: TemplateExercise[],
    dto: TemplateDto,
  ) {
    const map = new Map(
      templateExercises.map((rel) => [
        `${rel.exerciseId}-${rel.position}`,
        rel,
      ]),
    );

    const sets = dto.exercises.flatMap((ex) => {
      if (!ex.sets?.length) return [];

      return ex.sets.map((set) =>
        manager.create(TemplateExercisesSets, {
          templateExercise: map.get(`${ex.exerciseId}-${ex.position}`),
          position: set.position,
          defaultReps: set.defaultReps,
          defaultWeight: set.defaultWeight,
          defaultTime: set.defaultTime,
        }),
      );
    });

    await manager.save(sets);
  }

  private async editTemplate(
    manager: EntityManager,
    dto: TemplateDto,
    userId: string,
    templateId: string,
  ) {
    await manager.update(
      Template,
      { id: templateId, userId },
      {
        name: dto.name,
        description: dto.description,
      },
    );
  }

  private async editTemplateExercises(
    manager: EntityManager,
    templateId: string,
    dto: TemplateDto,
  ) {
    const exercises = await manager.find(TemplateExercise, {
      select: {
        id: true,
      },
      where: { templateId },
    });
    const exercisesIds = exercises.map((ex) => ex.id);
    const dtoExercisesIds = dto.exercises.map((ex) => ex.id);
    const exercisesToDelete = exercisesIds.filter(
      (id) => !dtoExercisesIds.includes(id),
    );

    if (exercisesToDelete.length) {
      await manager.delete(TemplateExercise, {
        id: In(exercisesToDelete),
      });
    }

    for (const ex of dto.exercises) {
      const exercise = await manager.save(TemplateExercise, {
        id: ex.id,
        templateId,
        exerciseId: ex.exerciseId,
        position: ex.position,
      });

      await this.editTemplateExerciseSets(manager, exercise, ex.sets);
    }
  }

  private async editTemplateExerciseSets(
    manager: EntityManager,
    exercise: TemplateExercise,
    setsDto: SetsDto[] = [],
  ) {
    const sets = await manager.find(TemplateExercisesSets, {
      select: {
        id: true,
      },
      where: { templateExercisesId: exercise.id },
    });
    const setsIds = sets.map((set) => set.id);
    const dtoSetsIds = setsDto.map((set) => set.id);
    const setsToDelete = setsIds.filter((id) => !dtoSetsIds.includes(id));

    if (setsToDelete.length) {
      await manager.delete(TemplateExercisesSets, {
        id: In(setsToDelete),
      });
    }

    for (const setDto of setsDto) {
      await manager.save(TemplateExercisesSets, {
        id: setDto.id,
        templateExercisesId: exercise.id,
        position: setDto.position,
        defaultReps: setDto.defaultReps,
        defaultWeight: setDto.defaultWeight,
        defaultTime: setDto.defaultTime,
      });
    }
  }
}
