import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";



export class ListTagsService {
    async execute() {
        const listTagsRepositories = getCustomRepository(TagsRepository);

        const tags = await listTagsRepositories.find();

        return tags;
    }
}