import express from 'express';
import { UserService } from '../services';

export const authRouter = express.Router();
const userService = new UserService();

authRouter.post('/register', async (request, response) => {
    const { email, password } = request.body;

    try {
        const createdUser = await userService.registerUser({ email, password });

        return response.json({
            createdUser,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message ?? 'Registration failed',
        });
    }
});
