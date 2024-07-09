import parse from './parsers.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const file1 = parse(filepath1);
    const file2 = parse(filepath2);
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    
    const merge = _.sortBy(_.union(keys1, keys2)); 
    
    const statusTree = merge.map((key) => {
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
            return {status: 'nested', key, value: genDiff(file1[key], file2[key])}
        }
        if (!Object.hasOwn(file1, key)) {
            return {status: 'added', key, value: file2[key]};
        };
        if (!Object.hasOwn(file2, key)) {
            return {status: 'deleted', key, value: file1[key]};
        };
        if (file1[key] !== file2[key]) {
            return {status: 'changed', value1: file1[key], value2: file2[key]};
        };
        return {status: 'unchanged', key, value: file1[key]};
        
    });
    return buildTree(statusTree);
};
export default genDiff;
