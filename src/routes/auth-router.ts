import bcrypt from 'bcrypt';
import express from 'express';
import { UserService } from '../services';

export const authRouter = express.Router();
const userService = new UserService();

authRouter.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return response.status(404).json({
                error: 'User not found',
            });
        }

        if (!(await bcrypt.compare(password, user.password as string))) {
            return response.status(403).json({
                error: 'Invalid password',
            });
        }

        user.password = undefined;

        response.json({
            user,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message ?? 'Registration failed',
        });
    }
});

authRouter.post('/register', async (request, response) => {
    const { name, email, password } = request.body;

    try {
        const createdUser = await userService.registerUser({
            name,
            email,
            password,
        });

        createdUser.password = undefined;

        return response.json({
            createdUser,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message ?? 'Registration failed',
        });
    }
});
