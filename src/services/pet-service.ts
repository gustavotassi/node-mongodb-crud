import { petModel } from '../models';

export class PetService {
    /**
     * Gets all the pets from collection
     * @returns Pets array
     */
    public async getAllPets(filter?: any) {
        const pets = await petModel.find({
            name: filter,
        });

        return pets;
    }
}
