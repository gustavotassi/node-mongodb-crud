import cors from 'cors';
import express from 'express';
import environment from './config/environment';
import { petRouter } from './routes';

const app = express();
const { port } = environment;

app.use(cors());
app.use(petRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
