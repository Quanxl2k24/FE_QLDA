import { z } from "zod";

export const MooncakeCategorySchema = z.enum([
  "all",
  "baked",
  "snowskin",
  "gift-boxes",
]);

export const MooncakeItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: MooncakeCategorySchema,
  crustDescription: z.string(),
  fillingDescription: z.string(),
  price: z.number().positive(),
  imageUrl: z.string().url().or(z.string().startsWith("/")),
  isOnlineOnly: z.boolean().optional(),
  calories: z.number().optional(),
  weightGrams: z.number().optional(),
});

export const OrderMooncakeSchema = z.object({
  mooncakeId: z.string(),
  quantity: z.number().int().positive().max(99),
  customNote: z.string().max(200).optional(),
});

export type OrderMooncakeInput = z.infer<typeof OrderMooncakeSchema>;
