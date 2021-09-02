import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from '../config/environment';
import { IUser } from '../interfaces';
import { userModel } from '../models';

export class UserService {
    /**
     * Creates a new user
     * @param user User parameters
     * @returns The created user
     */
    public async registerUser(user: IUser): Promise<IUser> {
        const userAlreadyExists = await userModel.findOne({
            email: user.email,
        });

        if (userAlreadyExists) {
            throw new Error('Email already in use');
        }

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(user.password as string, salt);

        user.password = hashedPassword;

        const createdUser = await userModel.create(user);

        return createdUser;
    }

    /**
     * Search for a user by their email
     * @param email User's email
     * @returns User's details
     */
    public async findUserByEmail(email: string) {
        const user = userModel
            .findOne({
                email,
            })
            .select('+password');

        return user;
    }

    public generateAwsToken(params: any): string {
        return jwt.sign(params, environment.jwtSecret, {
            expiresIn: 86400,
        });
    }
}
