import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepositories } from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { token_secret } from '../../token_key';

interface IPayload {
    sub: string;
}

export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
    let isAdmin = false;
    const { user_id } = request;

    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne({
        id: user_id
    });
    
    if (user.admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
}