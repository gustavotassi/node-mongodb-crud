import dotenv from 'dotenv';

dotenv.config();

const config = process.env;

export default {
    port: config.PORT ?? 3000,
    dbUri: config.DB_URI ?? '',
};
