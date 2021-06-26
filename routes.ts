import { Router } from 'express';
import { CreateTagController } from './src/controllers/CreateTagController';
import { CreateUserController } from './src/controllers/CreateUserController';
import { AutheticateUserController } from './src/controllers/AutheticateUserController';
import { ensureIsAdmin } from './src/middleware/ensureIsAdmin';

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AutheticateUserController();

// da pra passar um middleware para uma única rota inserindo entre o caminho e a função handler
router.post("/tags", ensureIsAdmin, createTagController.handleCreateTag);
router.post("/users", createUserController.handleCreateUser);

router.post('/login', authenticateUserController.handleAuthenticateUser);

export { router };