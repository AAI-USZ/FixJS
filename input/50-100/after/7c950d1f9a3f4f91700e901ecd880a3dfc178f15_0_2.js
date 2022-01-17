function (comp, name, value) {
        var cb_name = this.extractAPI(comp, 'set', name);
        if (cb_name == '!VAR') {
            return this.setVar(comp, name, value);
        }
        this.setters[cb_name](comp, value);
        return true;
    }