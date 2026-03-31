import { join, resolve } from 'node:path';

export const configDB = () => {
    const __dirname = resolve('.');
    const file = join(__dirname, 'src', 'data', 'db.json');

    return file;
};
