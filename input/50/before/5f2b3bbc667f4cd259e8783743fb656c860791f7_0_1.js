function() {
        forth.callStack.push(this);
        forth.runCode(this.code, this);
        forth.callStack.pop();
    }