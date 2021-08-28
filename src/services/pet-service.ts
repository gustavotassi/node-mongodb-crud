import { IPet } from '../interfaces';
import { petModel } from '../models';

export class PetService {
    /**
     * Gets all the pets from collection
     * @returns Pets array
     */
    public async getAllPets(name?: any, species?: any): Promise<IPet[]> {
        const search: {
            name?: any;
            species?: any;
        } = {};

        if (name) {
            search.name = new RegExp(name, '');
        }

        if (species) {
            search.species = new RegExp(species, '');
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
     * Updates a pet from the collection
     * @param id The pet identifier
     * @returns Info about the updated pet
     */
    public async updatePet(id: string, pet: IPet) {
        const updatedPet = await petModel.findByIdAndUpdate(id, pet, {
            new: true,
        });

        return updatedPet;
    }

    /**
     * Deletes a pet from the collection
     * @param id The pet identifier
     * @returns Info about the deleted pet
     */
    public async deletePet(id: string) {
        const deletedPet = await petModel.findByIdAndDelete(id);

        return deletedPet;
    }
}
