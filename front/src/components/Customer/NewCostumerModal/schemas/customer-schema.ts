import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  coordXY: z.string().regex(/^\(\d+,\d+\)$/, {
    message: 'Coordinates must be in the format (x,y)',
  }),
});
