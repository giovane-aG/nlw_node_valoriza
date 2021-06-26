import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import {UserRepositories} from '../repositories/UsersRepository';

interface IUserRequest {
    name: string;
    email: string;
    admin?: string;
    password: string
}

class CreateUserService {
    async execute({ name, email, admin, password }: IUserRequest) {
        const userRepository = getCustomRepository(UserRepositories);

        if (!email) {
            throw new Error("Email required");
        }
        if (!password) {
            throw new Error("Password required");
        }

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            admin,
            password: hashedPassword
        });

        await userRepository.save(user);
        return user;
    }
}

export { CreateUserService }