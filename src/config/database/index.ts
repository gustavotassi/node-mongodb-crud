import mongoose from 'mongoose';
import environment from '../environment';

const { dbUri } = environment;

mongoose.connect(dbUri);
mongoose.Promise = global.Promise;

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);

export default mongoose;
