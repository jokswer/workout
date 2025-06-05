import { z } from 'zod';

export const SetsSchema = z.object({
  position: z.number().positive(),
  defaultReps: z.number().positive().optional(),
  defaultWeight: z.number().positive().optional(),
  defaultTime: z.number().positive().optional(),
});

export const ExerciseSchema = z.object({
  exerciseId: z.number(),
  position: z.number().positive(),
  sets: z.array(SetsSchema).optional(),
});

export const CreateTemplateSchema = z.object({
  name: z.string().max(255),
  description: z.string().optional(),
  exercises: z.array(ExerciseSchema),
});

export type SetsDto = z.infer<typeof SetsSchema>;
export type ExerciseDto = z.infer<typeof ExerciseSchema>;
export type CreateTemplateDto = z.infer<typeof CreateTemplateSchema>;
