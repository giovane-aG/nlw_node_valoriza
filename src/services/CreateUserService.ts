import { getCustomRepository } from 'typeorm';
import {UserRepositories} from '../repositories/UsersRepository';

interface IUserRequest {
    name:   string;
    email:  string;
    admin?: string;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        const userRepository = getCustomRepository(UserRepositories);

        if (!email) {
            throw new Error("Email required");
        }

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new Error("Email already exists");
        }

        const user = userRepository.create({
            name,
            email,
            admin
        });

        await userRepository.save(user);
        return user;
    }
}

export { CreateUserService }