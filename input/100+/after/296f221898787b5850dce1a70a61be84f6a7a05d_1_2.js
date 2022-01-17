function(func) {
        var blocks = this.blocks;
        var symbol = { level: 0, variable: -1 };
        if (func.constant) {
            symbol.name = '"' + func.constant + '"';
        } else if (func.func) {
            symbol.sub = newBlock(blocks, 0, 'function');
            symbol.sub.func = func.func;
            symbol.sub.args = func.args;
            symbol.sub.name= func.name;
        }
        this.frame[0].scope[func.name] = symbol;
    }