import { z } from 'zod';

export const SetsSchema = z.object({
  id: z.string().uuid().optional(),
  position: z.number().positive(),
  isDone: z.boolean().optional(),
  defaultReps: z.number().positive().optional(),
  defaultWeight: z.number().positive().optional(),
  defaultTime: z.number().positive().optional(),
});

export const ExerciseSchema = z.object({
  id: z.string().uuid().optional(),
  exerciseId: z.number(),
  position: z.number().positive(),
  sets: z.array(SetsSchema).optional(),
});

export const WorkoutSchema = z
  .object({
    isDone: z.boolean().optional(),
    exercises: z.array(ExerciseSchema),
  })
  .optional();

export type SetsDto = z.infer<typeof SetsSchema>;
export type ExerciseDto = z.infer<typeof ExerciseSchema>;
export type WorkoutDto = z.infer<typeof WorkoutSchema>;
