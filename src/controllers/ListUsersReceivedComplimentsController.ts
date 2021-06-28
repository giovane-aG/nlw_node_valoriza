import {Request,Response} from 'express';
import { ListUsersReceivedComplimentsService } from '../services/ListUsersReceivedComplimentsService';


export class ListUsersReceivedComplimentsController {

    async handle(request: Request, response: Response) {
        
        const { user_id } = request;
        
        const listUsersReceivedComplimentsService = new ListUsersReceivedComplimentsService();       
        const receivedCompliments  = await listUsersReceivedComplimentsService.execute(user_id);

        return response.status(200).json(receivedCompliments);
    }
}