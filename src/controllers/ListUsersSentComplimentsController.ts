import {Request,Response} from 'express';
import { ListUsersSentComplimentsService } from '../services/ListUsersSentComplimentsService';


export class ListUsersSentComplimentsController {

    async handle(request: Request, response: Response) {
        
        const { user_id } = request;
        
        const listUsersSentComplimentsService = new ListUsersSentComplimentsService();       
        const receivedCompliments  = await listUsersSentComplimentsService.execute(user_id);

        return response.status(200).json(receivedCompliments);
    }
}