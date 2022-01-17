f        var args = this.getArguments(block, block.arguments);
        var start = block.level === 1 ? 'Container.' + block.name + ' = ' : '';
        if (block.name === '__global__') {
            return '';
        } else if (block.kind === 'namespace' || (block.level === 1 && FunctionTypes[block.kind])) {
            if (FunctionTypes[block.kind]) {
                start = 'var ' + block.name + ' = ' + start;
            }
            return start + 'function(' + args + ') {\n';
        } else if (FunctionTypes[block.kind]) {
            if (block.parent.kind === 'namespace') {
                start = 'this.';
            } else {
                start = 'var ';
            }
            return start + block.name + ' = function(' + args + ') {\n';
        } else if (block.kind === 'caseBlock') {
            return '\n';
        } else {
            return '{\n';
        }
    },
