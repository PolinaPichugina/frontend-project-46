import { fileURLToPath } from 'url';
import {join, dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixtureFilepath = (filepath) => join(__dirname,  '__fixtures__', filepath);

const readFile = (filepath) => readFileSync(getFixtureFilepath(filepath), 'utf-8');

export {readFile, getFixtureFilepath};