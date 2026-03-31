import { readFile } from 'node:fs/promises';
import type { Potato } from '../schemas/potato.ts';
import type { Repository } from '../types/repo.ts';

export class PotatoesRepoJSON implements Repository<Potato> {
    #potatoes: Potato[] = [];
    #file: string;
    #collection: string;

    constructor(file: string, collection = 'potatoes') {
        this.#file = file;
        this.#collection = collection;
    }

    async read(): Promise<Potato[]> {
        const fileContent = await readFile(this.#file, { encoding: 'utf-8' });
        this.#potatoes = JSON.parse(fileContent)[this.#collection];
        return [...this.#potatoes];
    }

    async readById(id: string): Promise<Potato> {
        const fileContent = await readFile(this.#file, { encoding: 'utf-8' });
        this.#potatoes = JSON.parse(fileContent)[this.#collection];
        const potato = this.#potatoes.find((potato) => potato.id === id);
        if (!potato) {
            throw new Error(`No hay ninguna patata con ese ${id}`);
        }
        return potato;
    }
}
