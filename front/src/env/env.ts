import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
export default envSchema;
