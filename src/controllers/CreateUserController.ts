import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {

    async handleCreateUser(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;
        const userService = new CreateUserService();
        const user = await userService.execute({ name, email, admin, password });
        
        return response.json(user);
    }
}

export { CreateUserController }