import { readFile } from '../src/utils.js';
import genDiff from '../src/index.js';

test('gendiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(readFile('result-stylish.txt'));
  expect(genDiff('file1.yml', 'file2.yml')).toBe(readFile('result-stylish.txt'));
  expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(readFile('result-plain.txt'));
  expect(genDiff('file1.json', 'file2.json', 'json')).toBe(readFile('result-json.txt'));
});
