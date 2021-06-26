import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepository";
import { token_secret } from '../../token_key';

interface IUserAutheticate {
    email: string;
    password: string;
}

export class AuthenticateUserService {

    async execute ({ email, password }: IUserAutheticate) {

        const userRepository = getCustomRepository(UserRepositories);
        const user = await userRepository.findOne({ email });

        if (!user) {
            throw new Error("Invalid Email/Password");
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error("Invalid Email/Password");
        }

        const token = sign({
            email: user.email
        }, token_secret, {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}