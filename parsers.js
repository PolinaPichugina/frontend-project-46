import {readFile, getFormat} from "./utils.js";
import yaml from 'js-yaml';

const parse = (filepath) => {
  const format = getFormat(filepath);
  switch (format) {
    case 'json':
        return JSON.parse(readFile(filepath));
    case 'yml':
      return yaml.load(readFile(filepath));
    case 'yaml':
      return yaml.load(readFile(filepath));
    default:
      throw new Error(`Invalid format: ${format}`);
  };
};

export default parse;