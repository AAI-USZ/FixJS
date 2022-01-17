function (cb_name, cb) {
        this.setters[cb_name] = cb;
        return true;
    }