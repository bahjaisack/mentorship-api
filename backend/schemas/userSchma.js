import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(1, "name is requires"),
    email: z.string().email("email must be valid"),
    password: z.string().min(6,"password must be at lleast 6 characters").max(100,"password must be at least 100 characters")
    // .regax(/[A-Z]/, "must be include at least one uppercase letter")
    // .regax(/[a-z]/, "must be include at least one lowercase letter")
    // .regax(/[0-9]/, "must be include at least one number")
    // .regax(/[^A-Za-z0-9]/, "must be include at least one special character")


})