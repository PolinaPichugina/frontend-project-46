import {readFile} from "./utils.js";
import _ from 'lodash';


const genDiff = (filepath1, filepath2) => {
    const file1 = JSON.parse(readFile(filepath1));
    const file2 = JSON.parse(readFile(filepath2));
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    
    const merge = _.sortBy(_.union(keys1, keys2)); 
    const space = '    ';
    const result = merge
    .map((key) => {
        if (!Object.hasOwn(file1, key)) {
            return `${space}+ ${key}: ${file2[key]}`;
        };
        if (!Object.hasOwn(file2, key)) {
            return `${space}- ${key}: ${file1[key]}`;
        };
        if (file1[key] !== file2[key]) {
            return `${space}- ${key}: ${file1[key]}\n    + ${key}: ${file2[key]}`;
        };
        return `${space}  ${key}: ${file1[key]}`;
        
    });
    return `{
${result.join('\n')}
}`
}

export default genDiff;
