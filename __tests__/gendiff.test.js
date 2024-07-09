import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../AST.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFileSync(getFixturePath('result.txt'), 'utf-8'));
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(readFileSync(getFixturePath('result.txt'), 'utf-8'));
});