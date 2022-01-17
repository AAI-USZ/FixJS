function(block, code, type) {
        var bracketBegin = '', bracketEnd = '';
        code.noSemicolon = true;
        var next, str = '';
        if (type !== 'else') {
            bracketBegin = '(';
            bracketEnd = ')';
        }
        if (type === 'case' || type === 'default') {
            bracketBegin = '';
            bracketEnd = ':';
        }
        do {
            next = block[0];
            if (next && next.type.indexOf('case') === -1) {
                block.codes.shift();
                str += this.translateCode(block, next);
            }
        } while (next && next.type.indexOf('case') === -1);
        str += this.variables.join(' ');
        this.variables = [];
        var childBlock = block.children.shift();
        return type + ' ' + bracketBegin + str + bracketEnd + this.addJSBlock(childBlock);
    }