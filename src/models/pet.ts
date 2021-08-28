import mongoose from '../config/database';
import { IPet } from '../interfaces';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now },
});

export const petModel = mongoose.model<IPet>('Pet', schema);
