import { Request, Response, NextFunction } from 'express';

export function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
    let isAdmin = true;

    if (isAdmin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
}