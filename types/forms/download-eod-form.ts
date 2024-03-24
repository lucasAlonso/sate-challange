import { addDays } from "date-fns";
import { z } from "zod";

export const formEodSchema = z
  .object({
    latmin: z.coerce
      .number()
      .min(-90, {
        message: "Latitude must be between -90 and 90",
      })
      .max(180, { message: "Latitude must be between -90 and 90" }),
    lonmin: z.coerce
      .number()
      .min(-180, {
        message: "Longitude must be between -180 and 180",
      })
      .max(180, { message: "Longitude must be between -180 and 180" }),

    latmax: z.coerce
      .number()
      .min(-90, {
        message: "Latitude must be between -90 and 90",
      })
      .max(180, { message: "Latitude must be between -90 and 90" }),
    lonmax: z.coerce
      .number()
      .min(-180, {
        message: "Longitude must be between -180 and 180",
      })
      .max(180, { message: "Longitude must be between -180 and 180" }),

    from: z.date(),
    to: z.date(),
  })
  .refine(
    (values) => {
      return values.latmax > values.latmin;
    },
    {
      message: "Maximum latitude must be greater than minimum latitude",
      path: ["latmax"],
    },
  )
  .refine(
    (values) => {
      return values.lonmax > values.lonmin;
    },
    {
      message: "Maximum longitude must be greater than minimum longitude",
      path: ["lonmax"],
    },
  );

export type FormValues = z.infer<typeof formEodSchema>;
