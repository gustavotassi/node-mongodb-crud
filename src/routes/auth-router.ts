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
            return response.status(401).json({
                error: 'Invalid password',
            });
        }

        user.password = undefined;

        const token = userService.generateAwsToken({ id: user.id });

        response.json({
            user,
            token,
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
        const user = await userService.registerUser({
            name,
            email,
            password,
        });

        user.password = undefined;

        const token = userService.generateAwsToken({ id: user.id });

        return response.json({
            user,
            token,
        });
    } catch (error) {
        return response.status(500).json({
            error: error.message ?? 'Registration failed',
        });
    }
});
