import {Request} from 'express'

export interface JwtPayload {
    id:string;
    username:string;
}

export interface AuthRequest extends Request {
    user?:JwtPayload;
}