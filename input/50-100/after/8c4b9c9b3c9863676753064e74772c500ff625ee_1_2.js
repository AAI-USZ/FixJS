function(file) {
        var stat = fs.statSync(path.join(this.options.root, file));
        return !stat.isDirectory() &&
                stat.isFile() &&
                this.options.extRegex.test(file) &&
                this.options.filter.test(file);
    }