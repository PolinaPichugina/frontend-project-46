import _ from 'lodash';

const replacer = ' ';
const spaceCount = 4;
const leftTab = 2;
const bracketIntent = (depth) => replacer.repeat((depth * spaceCount) - spaceCount);

const getStr = (lines, depth) => ['{', ...lines, `${bracketIntent(depth)}}`].join('\n');

const getValue = (data, depth) => {
  const ident = replacer.repeat((spaceCount * depth));
  if (!_.isObject(data)) {
    return value;
  }
  const entries = Object.entries(data);
  const lines = entries.map(([key, value]) => `${ident}${key}: ${getValue(value, depth + 1)}`);

  return getStr(lines, depth);
};

const makeStylishDiff = (tree) => {
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
        default: throw new Error (`'${line.status}' status is uncorrect`);
  } });
    return getStr(result, depth);
};
  return buildTree(tree, 1);
};

export default makeStylishDiff;
