import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM"), {
    message: "Month must be in MM format",
  }),
  year: z.string().refine((value) => isMatch(value, "yyyy"), {
    message: "Year must be in yyyy format",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
