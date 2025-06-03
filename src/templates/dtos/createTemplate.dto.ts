class SetsDto {
  public readonly position: number;
  public readonly defaultReps?: number;
  public readonly defaultWeight?: number;
  public readonly defaultTime?: number;
}

class ExerciseDto {
  public readonly exerciseId: number;
  public readonly position: number;
  public readonly sets?: SetsDto[];
}

export class CreateTemplateDto {
  public readonly name: string;
  public readonly description?: string;
  public readonly exercises: ExerciseDto[];
}
