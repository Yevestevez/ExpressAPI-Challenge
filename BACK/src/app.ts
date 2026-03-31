import express from 'express';
import potatoesRouter from './router/potatoes-router.ts';

export const app = express();
console.log('Express app created');

app.use(express.json());
app.use(express.static('./public'));

app.get('/', (_req, res) => {
    res.send('Express app working');
});

app.use('/api/potatoes', potatoesRouter());
