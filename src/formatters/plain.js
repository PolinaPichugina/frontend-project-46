const getValue = (value) => {
    switch (typeof value) {
      case 'object': return (value === null) ? 'null' : '[complex value]';
      case 'string': return `'${value}'`;
      default: return `${value}`;
    }
};

const makePlainDiff = (diff) => {
    const iter = (node, key = '') => {
        const lines = node.map((line) => {
            const path = [...key, line.key];
          switch (line.status) {
            case 'nested': return iter(line.value, path);
            case 'added': return `Property '${path.join('.')}' was added with value: ${getValue(line.value)}`;
            case 'deleted': return `Property '${path.join('.')}' was removed`;
            case 'changed': return `Property '${path.join('.')}' was updated. From ${getValue(line.value1)} to ${getValue(line.value2)}`;
            case 'unchanged': return null;
            default: throw Error('Uncorrect data');
          };
          
        }); return lines.filter((el) => el).join('\n');
    }; return iter (diff, [])
};
export default makePlainDiff;