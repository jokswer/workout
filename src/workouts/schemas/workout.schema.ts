import { z } from 'zod';

export const WorkoutSchema = z
  .object({
    templateId: z.string().uuid().optional(),
  })
  .optional();

export const SetsSchema = z.object({
  id: z.string().uuid().optional(),
  position: z.number().positive(),
  reps: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  time: z.number().positive().optional(),
});

export const ExerciseSchema = z.object({
  id: z.string().uuid().optional(),
  exerciseId: z.number(),
  position: z.number().positive(),
  sets: z.array(SetsSchema).optional(),
});

export const EditWorkoutSchema = z.object({
  isDone: z.boolean(),
  exercises: z.array(ExerciseSchema).optional(),
});

export type WorkoutDto = z.infer<typeof WorkoutSchema>;
export type EditWorkoutDto = z.infer<typeof EditWorkoutSchema>;
export type WorkoutExerciseDto = z.infer<typeof ExerciseSchema>;
export type WorkoutExerciseSetDto = z.infer<typeof SetsSchema>;
