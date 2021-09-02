import mongoose from '../config/database';
import { IUser } from '../interfaces';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    created_at: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model<IUser>('User', schema);
