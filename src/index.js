import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import { getFormat, readFile } from './utils.js';

const statusTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const merge = _.sortBy(_.union(keys1, keys2));
  const tree = merge.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { status: 'nested', key, children: statusTree(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { status: 'added', key, value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { status: 'deleted', key, value: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        status: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    return { status: 'unchanged', key, value: data1[key] };
  });
  return tree;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));
  return formatter(statusTree(data1, data2), format);
};
export default genDiff;
