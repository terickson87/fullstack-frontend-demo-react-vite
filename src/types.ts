import { z } from "zod";

export const noteSchema = z.object({
  id: z.number().positive().int(),
  createdAt: z.coerce.date(),
  modifiedAt: z.coerce.date(),
  body: z.string(),
});

export const pageInfoSchema = z.object({
  pageSize: z.number().positive().int().optional(),
  continuation:  z.number().nonnegative().int().optional(),
}).or(z.object({}));

export const notesResponseSchema = z.object({
  notes: z.array(noteSchema),
  pageInfo: pageInfoSchema,
});

export type Note = z.infer<typeof noteSchema>;
export type NotesResponse = z.infer<typeof notesResponseSchema>;