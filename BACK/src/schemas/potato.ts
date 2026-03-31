import type { Farmer } from './farmer.ts';

export interface Potato {
    id: string;
    weight: number;
    price: number;
    color: string;
    owner?: Farmer;
}
