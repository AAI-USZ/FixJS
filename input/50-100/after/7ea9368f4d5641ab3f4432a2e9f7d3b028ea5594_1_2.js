function(goInside) {
        if (forth.contexts[forth.contexts.length-1] != this)
            throw 'bug: step() on a non-topmost context';

        if (this.ip < this.code.length) {
            this.ip = forth.stepCode(this.ip, this.code, this.word, goInside);
            forth.dbg.setIp(this.elt, this.ip);
        } else {
            this.end();
        }
    }