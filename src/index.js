import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

  const statusTree = (file1, file2) => {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const merge = _.sortBy(_.union(keys1, keys2));
    const tree = merge.map((key) => {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return { status: 'nested', key, value: statusTree(file1[key], file2[key]) };
      }
      if (!Object.hasOwn(file1, key)) {
        return { status: 'added', key, value: file2[key] };
      }
      if (!Object.hasOwn(file2, key)) {
        return { status: 'deleted', key, value: file1[key] };
      }
      if (file1[key] !== file2[key]) {
        return {
          status: 'changed', key, value1: file1[key], value2: file2[key],
        };
      }
      return { status: 'unchanged', key, value: file1[key] };
    });
    return tree;
  };
  return formatter(statusTree(file1, file2), format);
};
export default genDiff;
