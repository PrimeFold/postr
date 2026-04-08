import {Request} from 'express'

export interface JwtPayload {
    id:string;
}

export interface AuthRequest extends Request {
    user?:JwtPayload;
}