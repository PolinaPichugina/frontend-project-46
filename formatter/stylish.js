import _ from 'lodash';

const replacer = '  ';

const bracketIntent = (replacer) => replacer.repeat(depth - 1);

const getStr = (lines) => ['{', ...lines, `${bracketIntent}}`].join('\n');

const getValue = (value, depth) => {
    const ident = replacer.repeat(depth)
    if (!_.isObject(value)) {
        return `${value}`;
    } 
    const entries = Object.entries(value);
    const lines = entries.map(([key, value]) => `${ident}${key}: ${getValue(value, depth + 1)}`);
    return getStr(lines);
};

const buildTree = (arrayOfTree) => {
const stylish = (arrayOfTree, depth) => {
    const ident = replacer.repeat(depth);
    const result = arrayOfTree.flatMap((line) => {
        switch (line.status) {
            case ('nested'): return `${ident}${line.key}: ${stylish(getValue(line.value, depth + 1))}`;
            case ('added'): return `${ident}+ ${line.key}: ${getValue(line.value, depth + 1)}`;
            case ('deleted'): return `${ident}- ${line.key}: ${getValue(line.value, depth + 1)}`;
            case ('changed'): return `${ident}- ${line.key}: ${(line.value1, depth + 1)}\n${ident}+ ${line.key}: ${(line.value, depth + 1)}`;
            case ('unchanged'): return `${ident.repeat(2)}${line.key}: ${(line.value, depth + 1)}`;
        }
    });
    return getStr(result);
}; return stylish(arrayOfTree, 1);
};

export default buildTree;