import type { NextFunction, Request, Response } from "express";
import { statusCodes } from "../app.js";
import { config } from "../config.js";
import UserModel from "../models/user.js";
import jwt, {type JwtPayload} from "jsonwebtoken";

interface customJwtPayload extends JwtPayload{
    _id : string;
}

declare global{
    namespace Express{
        interface Request {
            userId? : string;
        }
    }
}

export const auth  =  async(req: Request, res: Response , next: NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(statusCodes.NotFound).json({ msg: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token as string, config.JWT_SECRET) as customJwtPayload;
        const user = await UserModel.findById(decoded._id);
        if(!user){
            return res.status(statusCodes.NotFound).json({ msg: "User Not Found" });
        }
        req.userId = user._id.toString();
        next();
    } catch (error) {
        res.status(statusCodes.ServerError).json({msg : "Internal server error"})
    }
}