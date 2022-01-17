function(name, path) {
        return createTech(this.resolveTech(path || name), name, this);
    }