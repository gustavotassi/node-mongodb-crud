import { IPet } from '../interfaces';
import { petModel } from '../models';

export class PetService {
    /**
     * Gets all the pets from collection
     * @returns Pets array
     */
    public async getAllPets(filter?: any): Promise<IPet[]> {
        let search;

        if (filter) {
            search = { name: new RegExp(filter, 'i') };
        }

        const pets = await petModel.find({
            ...search,
        });

        return pets;
    }

    /**
     * Finds a pet by its ID
     * @param id The pet identifier
     * @returns Info about the found pet
     */
    public async getPetById(id: string) {
        const pet = await petModel.findById(id);

        return pet;
    }

    /**
     * Adds a pet to the collection
     * @param pet Pet to be added
     * @returns Details of the added pet
     */
    public async createPet(pet: IPet): Promise<IPet> {
        const createdPet = await petModel.create(pet);

        return createdPet;
    }

    /**
     * Deletes a pet from the collection
     * @param id The pet identifier
     * @returns Info about the deletion
     */
    public async deletePet(id: string) {
        const pet = await petModel.findById(id);

        if (!pet) {
            throw new Error('The pet could not be found');
        }

        const deletedPet = await petModel.findByIdAndDelete(id);

        return deletedPet;
    }
}
