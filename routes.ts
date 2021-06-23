import { Router } from 'express';
import { CreateUserController } from './src/controllers/CreateUserController';

const router = Router();
const createUserController = new CreateUserController();

router.get("/users", createUserController.handleCreateUser);

export { router };