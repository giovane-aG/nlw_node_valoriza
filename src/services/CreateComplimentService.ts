import { ComplimentsRepositories } from '../repositories/ComplimentsRepository';
import { UserRepositories } from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { email, password, host } from '../../token_key';
import nodeMailer from 'nodemailer';

interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

export class CreateComplimentService {

    async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UserRepositories);

        if (user_receiver === user_sender) {
            throw new Error("It is not allowed to give yourself a compliment");
        }
        const receiver = await userRepositories.findOne({
            id: user_receiver
        });

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

        var transporter = nodeMailer.createTransport({
            host,
            port: 587,
            secure:false,
            requireTLS:true,
            auth: { user: email, pass: password }
        });
          
        var mailMessage = {
            from: email,
            to: receiver.email,
            subject: 'Test Email Subject',
            text: 'Test email text'
        };
        
        transporter.sendMail(mailMessage)
        .then(info => {
            console.log(info)
        })
        .catch(err => {
            console.log(err)
        })
        ;
        
        return newCompliment;
    }

}