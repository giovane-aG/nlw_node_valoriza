import { getCustomRepository } from "typeorm";
import { TagsRepository } from '../repositories/TagsRepository';

export class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepository);

        if (!name) {
            throw new Error("Insert a name for the tag");
        }

        const nameAlreadyExists = await tagsRepositories.findOne({
            name
        });

        if (nameAlreadyExists) {
            throw new Error("The name you choose already exists");
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}