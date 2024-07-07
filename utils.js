import { readFileSync } from 'fs';
import { cwd } from 'node:process';
import { resolve } from 'path';

const readFile = (file) => {
    const filepath = resolve(cwd(), file);
    return readFileSync(filepath, 'utf8');
};
export {readFile};