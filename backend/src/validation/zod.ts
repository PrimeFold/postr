import z from 'zod'

export const signupSchema = z.object({
    username: z.string().min(3).max(30),
    email:z.email(),
    password:z.string().min(6)
})

