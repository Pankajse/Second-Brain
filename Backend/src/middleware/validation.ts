import {z} from "zod";

export const signValidation = z.object({
    username : z.string().min(3,"Minimum Length of Username should be 3").max(20,"Maximum Length of Username should be 20"),
    password : z.string().min(8,"Minimum Length of Password should be 8").max(20,"Maximum Length of Password should be 20")
});

export const contentValidation = z.object({
    link : z.string().min(3,"Minimum Length of Link should be 3"),
    type : z.enum(['image', 'video', 'article', 'audio','youtube','tweet']),
    title : z.string().min(3,"Minimum Length of Username should be 3"),
    tags : z.array(z.string()).optional(),
});

export type UserType = z.infer<typeof signValidation>
export type ContentType = z.infer<typeof contentValidation>
