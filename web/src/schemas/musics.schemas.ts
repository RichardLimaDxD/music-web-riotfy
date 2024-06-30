import { z } from "zod";

const musicSchema = z.object({
  id: z.string(),
  name: z.string(),
  album: z.string(),
  artist: z.string(),
  genre: z.string(),
  year: z.string(),
  cover_image: z.string().optional(),
  music_url: z.string().optional(),
});

export { musicSchema };
