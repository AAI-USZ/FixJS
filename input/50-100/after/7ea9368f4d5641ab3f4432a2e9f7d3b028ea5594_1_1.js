function() {
        forth.contexts.push(this);
        forth.stackTrace.push(this.word.name);
        this.elt = forth.dbg.pushContext(forth.contexts.length,
                                         this.word.name, this.code);
        forth.dbg.setIp(this.elt, this.ip);
    }