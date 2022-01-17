function (comp, name) {
        var cb_name = this.extractAPI(comp, 'get', name);
        if (cb_name == '!VAR') {
            return this.getVar(comp, name);
        }
        return this.getters[cb_name](comp);
    }