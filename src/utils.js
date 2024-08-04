import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixtureFilepath = (filepath) => resolve(__dirname, '..', '__fixtures__', filepath);

const readFile = (filepath) => readFileSync(getFixtureFilepath(filepath), 'utf-8');

const getFormat = (filepath) => extname(filepath).slice(1);

export { readFile, getFixtureFilepath, getFormat };
