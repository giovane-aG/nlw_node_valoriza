import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

    async handleCreateUser(request: Request, response: Response) {
        try {

            const { name, email, admin } = request.body;
            const userService = new CreateUserService();
            const user = await userService.execute({ name, email, admin });
            
            return response.json(user);

        } catch (e) {
            response.json({
                "error": true,
                "message": e.message
            });
        }
    }
}

export { CreateUserController }