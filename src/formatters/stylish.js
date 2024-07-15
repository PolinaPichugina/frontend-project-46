import _ from 'lodash';

const replacer = ' ';
const spaceCount = 4;
const leftTab = 2;
const bracketIntent = (replacer, depth) => replacer.repeat((depth * spaceCount) - spaceCount);

const getStr = (lines, depth) => ['{', ...lines, `${bracketIntent(replacer, depth)}}`].join('\n');

const getValue = (value, depth) => {
  const ident = replacer.repeat((spaceCount * depth));
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const lines = entries.map(([key, value]) => `${ident}${key}: ${getValue(value, depth + 1)}`);

  return getStr(lines, depth);
};

const makeStylishDiff = (array) => {
  const buildTree = (array, depth) => {
    const ident = replacer.repeat((spaceCount * depth) - leftTab);
    const result = array.flatMap((line) => {
      switch (line.status) {
        case 'added': return `${ident}+ ${line.key}: ${getValue(line.value, depth + 1)}`;
        case 'deleted': return `${ident}- ${line.key}: ${getValue(line.value, depth + 1)}`;
        case 'changed': return [
          `${ident}- ${line.key}: ${getValue(line.value1, depth + 1)}`,
          `${ident}+ ${line.key}: ${getValue(line.value2, depth + 1)}`,
        ];
        case 'unchanged': return `${ident}  ${line.key}: ${getValue(line.value, depth + 1)}`;
        case 'nested': return `${ident}  ${line.key}: ${buildTree(line.value, depth + 1)}`;
      }
    });
    return getStr(result, depth);
  };
  return buildTree(array, 1);
};

export default makeStylishDiff;
