import { z } from 'zod';

export const WebAppInitSchema = z.object({
  initData: z.string(),
});

export type WebAppInitDto = z.infer<typeof WebAppInitSchema>;
