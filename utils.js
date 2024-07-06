import { readFileSync } from 'fs';
import { cwd } from 'node:process';
import { resolve } from 'path';

const readFile = (file) => {
    const dirName = cwd(file);
    const filepath = resolve(dirName, file);
    return readFileSync(filepath, 'utf8');
};
export {readFile};