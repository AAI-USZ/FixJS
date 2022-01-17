function() {
        forth.stackTrace.push(this.name);
        forth.runCode(this.code, this);
        forth.stackTrace.pop();
    }