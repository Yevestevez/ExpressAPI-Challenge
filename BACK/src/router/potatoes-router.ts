import { Router, type Request, type Response } from 'express';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const router = () => {
    const getAll = async (__req: Request, res: Response) => {
        const __dirname = resolve('.');
        const file = join(__dirname, 'src', 'data', 'db.json');
        const fileContent = await readFile(file, { encoding: 'utf-8' });
        const potatoes = JSON.parse(fileContent);

        res.json(potatoes);
    };

    const router = Router();
    console.log('Potatoes router created');

    router.get('/', getAll);

    return router;
};

export default router;
