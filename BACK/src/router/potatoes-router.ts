import { Router, type Request, type Response } from 'express';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { PotatoesRepoJSON } from '../services/potatoes-repo-json.ts';

const router = () => {
    const getAll = async (__req: Request, res: Response) => {
        const __dirname = resolve('.');
        const file = join(__dirname, 'src', 'data', 'db.json');
        const repo = new PotatoesRepoJSON(file);
        const potatoes = await repo.read();

        res.json(potatoes);
    };

    const router = Router();
    console.log('Potatoes router created');

    router.get('/', getAll);

    return router;
};

export default router;
