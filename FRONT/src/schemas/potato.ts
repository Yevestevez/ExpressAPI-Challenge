import * as z from 'zod';

export const PotatoSchema = z.object({
    id: z.uuid(),
    weight: z.coerce.number(),
    price: z.coerce.number(),
    color: z.string().optional(),
    owner: z.string().optional(),
});

export const PotatoSchemaDTO = PotatoSchema.omit({ id: true });

export type Potato = z.infer<typeof PotatoSchema>;
export type PotatoDTO = z.infer<typeof PotatoSchemaDTO>;
export type PotatoUpdateDTO = Partial<PotatoDTO>;

// export interface Potato {
//     id: string;
//     weight: number;
//     price: number;
//     color?: string;
//     owner?: string;
// }
