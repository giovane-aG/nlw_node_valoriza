import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import "reflect-metadata";
import "./database";

import { router } from '../routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: true,
            message: err.message,
        });
    }

    return response.status(500).json({
        error: true,
        message: "Internal Server Error",
    });
})

app.listen(3000, () => {
    console.log(`Server running on port 3333`);
})
