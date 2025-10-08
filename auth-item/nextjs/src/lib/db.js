import z from 'zod'

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const itemSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export const users = [];
export const items = [];