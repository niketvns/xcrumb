import { z } from "zod";

export const projectScheme = z.object({
  name: z
    .string()
    .min(1, "Project name is requred")
    .max(100, "Project name must be 100 character or less"),
  key: z
    .string()
    .min(2, "Project key must be atleast 2 character")
    .max(10, "Project name must be 10 character or less"),
  description: z
    .string()
    .max(500, "Project description must be 500 character or less")
    .optional(),
});

export const sprintSchema = z.object({
  name: z.string().min(1, "Sprint name is Required"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
