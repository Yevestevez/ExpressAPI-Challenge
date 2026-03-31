import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';

import type { PotatoesRepoJSON } from '../services/potatoes-repo-json.ts';
import { HttpError } from '../errors/http-error.ts';
import { PotatoSchemaDTO, type PotatoUpdateDTO } from '../schemas/potato.ts';

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

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const potato = await this.repo.readById(id as string);
            res.json(potato);
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'NotFound',
                (error as Error).message,
            );
            finalError.cause = error;
            throw finalError;
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = PotatoSchemaDTO.parse(req.body);
            const result = await this.repo.create(data);
            res.statusCode = 201;
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    updateById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const data = PotatoSchemaDTO.partial().parse(
            req.body,
        ) as PotatoUpdateDTO;

        try {
            const result = await this.repo.updateById(id as string, data);
            res.json(result);
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'NotFound',
                (error as Error).message,
            );
            finalError.cause = error;
            next(finalError);
        }
    };

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            this.repo.deleteById(id as string);
            res.statusCode = 204;
            res.statusMessage = 'No Content';
            res.end();
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'NotFound',
                (error as Error).message,
            );
            finalError.cause = error;
            next(finalError);
        }
    };
}
