import { z } from 'zod';

export const WorkoutSchema = z
  .object({
    templateId: z.string().uuid().optional(),
  })
  .optional();

export type WorkoutDto = z.infer<typeof WorkoutSchema>;
