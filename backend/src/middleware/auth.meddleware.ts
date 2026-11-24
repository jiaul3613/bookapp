import { RequestHandler } from "express";
import { jwtHelper } from "../utils/jwtHelper";
import { JwtPayload } from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
const varifyToken: RequestHandler = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Acces denied ,Token not found')
    }
    try {
        const decoded = jwtHelper.varifyToken(authHeader);
       //console.log(decoded);
        req.user = decoded as JwtPayload;

        next();

    } catch (error) {
        throw new Error('invalid token')
    }
    
}

const authorizedRoles = (...roles: string[]) => {
    
    return (req:Request,res:Response,next:NextFunction) => {
        if (!req.user|| !roles.includes(req.user.role)) {
            throw new Error("forbidden: you don't have access ");
        } 
        next();
    }
}

export const authMiddleware = {
    varifyToken,
    authorizedRoles
}