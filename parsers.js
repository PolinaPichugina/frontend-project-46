import { readFile } from './utils.js';
import {extname} from 'path';

import yaml from 'js-yaml';

const parse = (filepath) => {
    const format = extname(filepath).slice(1);
  switch (format) {
     case 'json': return JSON.parse(readFile(filepath));
     case 'yml': return yaml.load(readFile(filepath));
     case 'yaml': return yaml.load(readFile(filepath));
     default: throw new Error(`Invalid format: ${format}`);
  };
};

export default parse;