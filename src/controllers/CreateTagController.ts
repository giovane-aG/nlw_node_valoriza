import { Request, Response } from 'express'
import { CreateTagService } from '../services/CreateTagService';

export class CreateTagController {
    async handleCreateTag(request: Request, response: Response) {
        const { name } = request.body;
        const createTagService = new CreateTagService();

        const tag = await createTagService.execute(name);

        return response.status(201).json({
            "error": false,
            "tag": tag,
        });
    }
}