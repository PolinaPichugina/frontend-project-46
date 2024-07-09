import { readFileSync } from 'fs';
import { resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const readFile = (file) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filepath = resolve(__dirname,  '__fixtures__', file);
    return readFileSync(filepath, 'utf8');
};
const getFormat = (file) => extname(file).slice(1);

export {readFile, getFormat};