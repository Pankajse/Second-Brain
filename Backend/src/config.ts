import {z} from "zod";
import "dotenv/config"

const envSchema = z.object({
    JWT_SECRET : z.string().min(3,"Minimum Length of JWT_SECRET is 3"),
    DB_URL : z.string().min(3,"Minimum Length of DB_URL is 3"),
    PORT : z.string().transform(Number),
    EMAIL : z.string(),
    PASSWORD : z.string()
});

const parsed = envSchema.parse(process.env);

export const config = {
    JWT_SECRET : parsed.JWT_SECRET,
    DB_URL : parsed.DB_URL,
    PORT : parsed.PORT,
    email : parsed.EMAIL,
    password : parsed.PASSWORD
}