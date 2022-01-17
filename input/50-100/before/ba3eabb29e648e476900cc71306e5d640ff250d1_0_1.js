function Module(filename, stubs) {
        this.id = this.filename = filename;
        this.dirname = dirname(filename);
        this.exports = {};
        this.stubs = {};
        for (var name in stubs) {
            this.stubs[name] = stubs[name];
        }
    }