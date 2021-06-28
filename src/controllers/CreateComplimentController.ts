import {Request, Response} from 'express';
import {CreateComplimentService} from '../services/CreateComplimentService';

export class CreateComplimentController {

    async handleCreateCompliment(request: Request, response: Response) {    
        const { user_receiver, message, tag_id } = request.body;
        const createComplimentService = new CreateComplimentService();

        const user_sender = request.user_id;

        const compliment = await createComplimentService.execute({
            user_receiver,
            user_sender,
            message,
            tag_id
        });

        return response.status(201).json(compliment);
    }
}