import genDiff from '../parsers.js';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

test('gendiff', () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFileSync(getFixturePath('result.txt'), 'utf-8'));
});