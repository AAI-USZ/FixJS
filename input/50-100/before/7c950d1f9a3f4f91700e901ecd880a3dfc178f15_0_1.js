function (comp, name) {
        var cb_name = this.extractAPI(comp, 'get', name);
        return this.getters[cb_name](comp);
    }