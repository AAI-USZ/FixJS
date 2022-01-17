function() {
        forth.contexts.push(this);
        forth.stackTrace.push(this.word.name);
    }