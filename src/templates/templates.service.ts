import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, IsNull, Repository } from 'typeorm';
import { CreateTemplateDto } from './schemas/createTemplate.schema';
import { Template } from './entities/templates.entity';
import { TemplateExercise } from './entities/template_exercises.entity';
import { TemplateExercisesSets } from './entities/template_exercises_sets.entity';

type TShortTemplate = Pick<Template, 'id' | 'name' | 'description'>;
type TGetUserTemplateByIdArgs = {
  userId: string;
  templateId: string;
};

@Injectable()
export class TemplatesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
    @InjectRepository(TemplateExercise)
    private readonly templateExerciseRepository: Repository<TemplateExercise>,
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

  public async getUserTemplateById({
    userId,
    templateId,
  }: TGetUserTemplateByIdArgs) {
    return await this.templateRepository.findOne({
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

  public async createUserTemplate(
    dto: CreateTemplateDto,
    userId: string,
  ): Promise<TShortTemplate | null> {
    return await this.dataSource.transaction(async (manager) => {
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
        where: { id: template.id },
      });
    });
  }

  private async createTemplate(
    manager: EntityManager,
    dto: CreateTemplateDto,
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
    dto: CreateTemplateDto,
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
    dto: CreateTemplateDto,
  ): Promise<void> {
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
}
