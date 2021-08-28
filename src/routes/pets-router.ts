import express from 'express';
import { PetService } from '../services/pet-service';

export const petRouter = express.Router();
const petService = new PetService();

petRouter.get('/pets', (request, response) => {
    const { filter } = request.query;

    try {
        const pets = petService.getAllPets(filter);

        return response.json({
            pets,
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Error getting pets',
        });
    }
});
