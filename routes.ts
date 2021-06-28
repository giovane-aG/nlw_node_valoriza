import { Router } from 'express';

import { CreateTagController } from './src/controllers/CreateTagController';
import { CreateUserController } from './src/controllers/CreateUserController';
import { AutheticateUserController } from './src/controllers/AutheticateUserController';
import { CreateComplimentController } from './src/controllers/CreateComplimentController';

import { ensureIsAdmin } from './src/middleware/ensureIsAdmin';
import { ensureAutheticate } from './src/middleware/autheticateToken';
import { ListUsersReceivedComplimentsController } from './src/controllers/ListUsersReceivedComplimentsController';
import { ListUsersSentComplimentsController } from './src/controllers/ListUsersSentComplimentsController';

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AutheticateUserController();
const createComplimentController = new CreateComplimentController();
const listUsersReceivedComplimentsController = new ListUsersSentComplimentsController();
const listUsersSentComplimentsController = new ListUsersSentComplimentsController();

// da pra passar um middleware para uma única rota inserindo entre o caminho e a função handler

router.post("/tags", ensureAutheticate, ensureIsAdmin, createTagController.handleCreateTag);
router.post("/users", createUserController.handleCreateUser);
router.post('/login', authenticateUserController.handleAuthenticateUser);
router.post('/compliments', ensureAutheticate, createComplimentController.handleCreateCompliment);
router.get('/users/received_compliments', ensureAutheticate, listUsersReceivedComplimentsController.handle);
router.get('/users/sent_compliments', ensureAutheticate, listUsersSentComplimentsController.handle);

export { router };