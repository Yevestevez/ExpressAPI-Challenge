import type { Request, Response } from 'express';
import debug from 'debug';

import type { PotatoesRepoJSON } from '../services/potatoes-repo-json.ts';

const log = debug('patatas:controller:potatoes');

export class PotatoesController {
    repo: PotatoesRepoJSON;

    constructor(repo: PotatoesRepoJSON) {
        this.repo = repo;
        log('Instance created');
    }

    getAll = async (_req: Request, res: Response) => {
        const potatoes = await this.repo.read();
        res.json(potatoes);
        return;
    };
}
