import makePlainDiff from './plain.js';
import makeStylishDiff from './stylish.js';
import makeJSONDiff from './json.js';

const formatter = (tree, format) => {
    switch (format) {
        case 'plain': return makePlainDiff(tree);
        case 'stylish': return makeStylishDiff(tree);
        case 'json': return makeJSONDiff(tree);
        default: throw new Error(`Uncorrect format`);
    }
};
export default formatter;