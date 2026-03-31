import { readFile, writeFile } from 'node:fs/promises';
import debug from 'debug';

import type { Potato, PotatoDTO, PotatoUpdateDTO } from '../schemas/potato.ts';
import type { Repository } from '../types/repo.ts';
import { configDB } from '../config/db-config.ts';

const log = debug('patatas:repo:potatoes');

export class PotatoesRepoJSON implements Repository<Potato> {
    #potatoes: Potato[] = [];
    #file: string;
    #collection: string;

    constructor(collection = 'potatoes') {
        log('PotatoesRepoJSON created');
        this.#file = configDB();
        this.#collection = collection;
    }

    private async load() {
        const fileContent = await readFile(this.#file, { encoding: 'utf-8' });
        this.#potatoes = JSON.parse(fileContent)[this.#collection];
    }

    private async save() {
        const fileContent = await readFile(this.#file, { encoding: 'utf-8' });
        const data = JSON.parse(fileContent);
        data[this.#collection] = this.#potatoes;
        const content = JSON.stringify(data, null, 4);
        await writeFile(this.#file, content, { encoding: 'utf-8' });
    }

    async read(): Promise<Potato[]> {
        await this.load();
        return [...this.#potatoes];
    }

    async readById(id: string): Promise<Potato> {
        await this.load();
        const potato = this.#potatoes.find((potato) => potato.id === id);
        if (!potato) {
            throw new Error(`No hay ninguna patata con el id [${id}]`);
        }
        return potato;
    }

    async create(potatoData: PotatoDTO): Promise<Potato> {
        await this.load();
        const potato: Potato = { ...potatoData, id: crypto.randomUUID() };
        this.#potatoes.push(potato);
        await this.save();
        return potato;
    }

    async updateById(id: string, data: PotatoUpdateDTO): Promise<Potato> {
        const potato = await this.readById(id);
        Object.assign(potato, data);
        await this.save();
        return potato;
    }

    async deleteById(id: string): Promise<Potato> {
        await this.load();
        const index = this.#potatoes.findIndex((potato) => potato.id === id);
        if (index === -1) throw new Error(`Patata con id ${id} no encontrada`);
        const deletedPotato = this.#potatoes.splice(index, 1)[0] as Potato;
        await this.save();
        return deletedPotato;
    }
}
