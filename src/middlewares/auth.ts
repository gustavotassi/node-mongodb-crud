import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import environment from '../config/environment';

export const authMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const headerToken = request.headers.jwttoken as string;

    if (!headerToken) {
        return response.status(401).json({
            error: 'No token provided',
        });
    }

    const parts = headerToken.split(' ');

    if (parts.length !== 2)
        return response.status(401).json({
            error: 'Error getting token',
        });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({
            error: 'Invalid token format',
        });

    jwt.verify(token, environment.jwtSecret, (err, decoded) => {
        if (err)
            return response.status(401).json({
                error: 'Invalid token',
            });

        if (decoded) {
            request.headers.userId = decoded.id;
        }

        return next();
    });
};
