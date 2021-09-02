import express from 'express';
import { authMiddleware } from '../middlewares';
import { PetService } from '../services';

export const petRouter = express.Router();
petRouter.use(authMiddleware);
const petService = new PetService();

petRouter.get('/pets/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const pet = await petService.getPetById(id);

        return response.json({
            pet,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Error getting pet information',
        });
    }
});

petRouter.get('/pets', async (request, response) => {
    const { name, species } = request.query;

    try {
        const pets = await petService.getAllPets(name, species);

        return response.json({
            pets,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Error getting pets',
        });
    }
});

petRouter.post('/pets', async (request, response) => {
    const { name, species, age } = request.body;

    try {
        const pet = await petService.createPet({
            name,
            species,
            age,
        });

        return response.json({
            pet,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Failed to create pet',
        });
    }
});

petRouter.put('/pets/update/:id', async (request, response) => {
    const { id } = request.params;
    const { name, species, age } = request.body;

    try {
        const pet = await petService.getPetById(id);

        if (!pet) {
            return response.status(404).json({
                error: 'The pet could not be found',
            });
        }

        const updatedPet = await petService.updatePet(id, {
            name,
            species,
            age,
        });

        return response.json({
            updatedPet,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Failed to update pet',
        });
    }
});

petRouter.delete('/pets/delete/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const pet = await petService.getPetById(id);

        if (!pet) {
            return response.status(404).json({
                error: 'The pet could not be found',
            });
        }

        const deletedPet = await petService.deletePet(id);

        return response.json({
            deletedPet,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Failed to delete pet',
        });
    }
});
