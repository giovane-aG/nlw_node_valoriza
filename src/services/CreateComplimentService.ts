import { ComplimentsRepositories } from '../repositories/ComplimentsRepository';
import { getCustomRepository } from 'typeorm';

interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

export class CreateComplimentService {

    async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentsRepositories);
        
        if (user_receiver === user_sender) {
            throw new Error("It is not allowed to give yourself a compliment");
        }
        const receiver = await complimentRepository.findByIds([user_receiver]);

        if (!receiver) {
            throw new Error("The user you want to compliment does not exist");
        }

        const newCompliment = complimentRepository.create({
            user_sender,
            user_receiver,
            tag_id,
            message,
        });

        await complimentRepository.save(newCompliment);

        return newCompliment;
    }

}