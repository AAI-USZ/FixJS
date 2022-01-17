function(block, code) {
        var end = this.variables.pop();
        var start = this.variables.pop();
        return this.loopStatement(block, start, end, code.variable);
    }