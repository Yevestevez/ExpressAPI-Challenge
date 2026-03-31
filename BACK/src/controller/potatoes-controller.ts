import type { PotatoesRepoJSON } from '../services/potatoes-repo-json.ts';
import type { Request, Response } from 'express';

export class PotatoesController {
    repo: PotatoesRepoJSON;

    constructor(repo: PotatoesRepoJSON) {
        this.repo = repo;
    }

    getAll = async (_req: Request, res: Response) => {
        const potatoes = await this.repo.read();
        res.json(potatoes);
        return;
    };
}
