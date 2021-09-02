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

        const createdUser = await userModel.create(user);

        return createdUser;
    }
}
