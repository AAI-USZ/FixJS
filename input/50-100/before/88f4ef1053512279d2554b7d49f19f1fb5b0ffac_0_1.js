function (cb_name, cb) {
        this.getters[cb_name] = cb;
        return true;
    }