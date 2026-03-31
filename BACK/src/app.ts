import express from 'express';
import potatoesRouter from './router/potatoes-router.ts';
import { PotatoesRepoJSON } from './services/potatoes-repo-json.ts';
import { PotatoesController } from './controller/potatoes-controller.ts';
import { errorHandler } from './middleware/error-handler.ts';

export const app = express();
console.log('Express app created');

app.use(express.json());
app.use(express.static('./public'));

const repo = new PotatoesRepoJSON();
const controller = new PotatoesController(repo);

app.get('/', (_req, res) => {
    res.send('Express app working');
});

app.use('/api/potatoes', potatoesRouter(controller));

app.use(errorHandler);
