import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import potatoesRouter from './router/potatoes-router.ts';
import { PotatoesRepoJSON } from './services/potatoes-repo-json.ts';
import { PotatoesController } from './controller/potatoes-controller.ts';
import { errorHandler } from './middleware/error-handler.ts';

const log = debug('patatas:app');
export const app = express();
app.disable('x-powered-by');
log('Express app created');

app.use(morgan('dev'));
app.use(
    cors({
        origin: '*',
    }),
);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

const repo = new PotatoesRepoJSON();
const controller = new PotatoesController(repo);

app.get('/', (_req, res) => {
    res.send('Express app working');
});

app.use('/api/potatoes', potatoesRouter(controller));

app.use(errorHandler);
