function(dirpath, mode) {
        var self = this;
        if(!fs.existsSync(dirpath)) {
            // try to create parent dir first.
            self.mkdirSync(path.dirname(dirpath), mode);
            fs.mkdirSync(dirpath, mode);
        }
    }