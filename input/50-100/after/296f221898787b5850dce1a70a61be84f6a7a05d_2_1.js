function(block, code) {
        var start = this.variables.pop();
        var end = this.variables.pop();
        return this.loopStatement(block, start - 1, end, code.variable, '--', '>=');
    }